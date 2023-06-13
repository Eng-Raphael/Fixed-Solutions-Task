const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const crypto = require('crypto');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public

exports.register = asyncHandler(async (req, res, next) => {

    const { firstName,lastName,email,password,username } = req.body;

     // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        username,
    });

    sendTokenResponse(user , 200 , res)

})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {

    const { username, password } = req.body;

    // Validate username & password
    if (!username || !password) {
        return next(new ErrorResponse('Please provide an username and password', 400));
    }
    // Check for user
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

      // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user , 200 , res)    

})

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: 'User logged out',
    });
});

  
// Get token from model , create cookie and send response 
const sendTokenResponse = (user , statusCode , res) =>{

    //create token
    const token = user.getSignedJwtToken();

    const options = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 *60 * 1000),
        httpOnly: true
    }

    // to make sure it is sent over HTTPS 
    if(process.env.NODE_ENV === 'production'){
        options.secure = true
    }

    res
        .status(statusCode)
        .cookie('token',token,options)
        .json({
            success:true , 
            token 
        })

}

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
    // user is already available in req due to the protect middleware
    const user = await User.findById(req.user.id)
  
    res.status(200).json({
      success: true,
      data: user,
    });
});


// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {

    const fieldsToUpdate = {};
    if (req.body.firstName) fieldsToUpdate.firstName = req.body.firstName;
    if (req.body.lastName) fieldsToUpdate.lastName = req.body.lastName;
    if (req.body.email) fieldsToUpdate.email = req.body.email;
    if (req.body.username) fieldsToUpdate.username = req.body.username;

    const user = await User.findByIdAndUpdate(req.user.id , fieldsToUpdate , {
        new : true,
        runValidators : true
    })

    if (req.body.oldPassword && req.body.newPassword){
        // Check current password
        if (!(await user.matchPassword(req.body.oldPassword))) {
            return next(new ErrorResponse('oldPassword Does not match', 401));
        }

        user.password = req.body.newPassword;
        await user.save();
    }


    res.status(200).json({
        success: true,
        data: user,
    });

});