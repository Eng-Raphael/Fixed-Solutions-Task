const {body} = require('express-validator');

exports.addToFavoriteValidationRules = () => {
    return [
      body('title').notEmpty().withMessage('Title is required'),
      body('description').notEmpty().withMessage('Description is required'),
      body('photographer').notEmpty().withMessage('Photographer is required'),
      body('url').notEmpty().withMessage('URL is required'),
      body('media_type').notEmpty().withMessage('Media type is required'),
      body('nasa_id').notEmpty().withMessage('NASA ID is required'),
    ];
};

