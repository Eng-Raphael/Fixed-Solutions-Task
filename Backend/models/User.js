const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: [3, 'First name must be at least 3 characters'],
    maxlength: [8, 'First name can be at most 8 characters'],
    required: [true, 'Please add your first name'],
  },
  lastName: {
    type: String,
    minlength: [3, 'Last name must be at least 3 characters'],
    maxlength: [8, 'Last name can be at most 8 characters'],
    required: [true, 'Please add your last name'],
  },
  username: {
    type: String,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [8, 'Username can be at most 8 characters'],
    required: [true, 'Please add a username'],
    unique: [true, 'Username is already taken'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: [true, 'Email is already taken'],
    match: [
      /^[\w.+-]+@(gmail|yahoo|hotmail)\.com$/,
      'Please add a valid email with @gmail, @yahoo, or @hotmail domain',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
  
  // Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
};
  
  // Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
module.exports = mongoose.model('User', UserSchema);