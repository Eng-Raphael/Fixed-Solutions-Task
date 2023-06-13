const { body } = require('express-validator');

// Express Validator rules
exports.registerRules = () => {
    return [
      body('firstName', 'First name must be at least 3 characters').isLength({ min: 3 }),
      body('firstName', 'First name can be at most 8 characters').isLength({ max: 8}),
      body('lastName', 'Last name must be at least 3 characters').isLength({ min: 3 }),
      body('lastName', 'Last name can be at most 8 characters').isLength({ max: 8 }),
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
      body('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
      body('username', 'Username can be at most 8 characters').isLength({ max: 8 }),
    ];
};
  
exports.loginRules = () => {
    return [
      body('username', 'Please include a valid username').exists(),
      body('password', 'Please enter a password').exists(),
    ];
};
  
exports.updateDetailsRules = () => {
    return [
      body('firstName', 'First name can be at most 8 characters').isLength({ max: 8 }),
      body('lastName', 'Last name can be at most 8 characters').isLength({ max: 8 }),
      body('email', 'Please include a valid email').isEmail(),
      body('username', 'Username can be at most 8 characters').isLength({ max: 8 }),
      body('newPassword', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ];
};

