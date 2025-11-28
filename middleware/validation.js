const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const userValidationRules = {
  create: [
    body('firstName')
      .trim()
      .notEmpty().withMessage('First name is required')
      .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
      .isAlpha('en-US', { ignore: ' -' }).withMessage('First name must contain only letters'),

    body('lastName')
      .trim()
      .notEmpty().withMessage('Last name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
      .isAlpha('en-US', { ignore: ' -' }).withMessage('Last name must contain only letters'),

    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email address')
      .normalizeEmail(),

    body('favoriteColor')
      .trim()
      .notEmpty().withMessage('Favorite color is required')
      .isLength({ min: 3, max: 30 }).withMessage('Favorite color must be between 3 and 30 characters'),

    body('birthday')
      .notEmpty().withMessage('Birthday is required')
      .isISO8601().withMessage('Birthday must be a valid date (YYYY-MM-DD)'),

    body('phoneNumber')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Phone number must contain only valid characters'),

    body('address')
      .trim()
      .notEmpty().withMessage('Address is required')
      .isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters'),

    body('city')
      .trim()
      .notEmpty().withMessage('City is required')
      .isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters'),
  ],

  update: [
    param('id')
      .notEmpty().withMessage('User ID is required')
      .isMongoId().withMessage('Invalid user ID format'),

    body('firstName')
      .trim()
      .notEmpty().withMessage('First name is required')
      .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
      .isAlpha('en-US', { ignore: ' -' }).withMessage('First name must contain only letters'),

    body('lastName')
      .trim()
      .notEmpty().withMessage('Last name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
      .isAlpha('en-US', { ignore: ' -' }).withMessage('Last name must contain only letters'),

    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email address')
      .normalizeEmail(),

    body('favoriteColor')
      .trim()
      .notEmpty().withMessage('Favorite color is required')
      .isLength({ min: 3, max: 30 }).withMessage('Favorite color must be between 3 and 30 characters'),

    body('birthday')
      .notEmpty().withMessage('Birthday is required')
      .isISO8601().withMessage('Birthday must be a valid date (YYYY-MM-DD)'),

    body('phoneNumber')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Phone number must contain only valid characters'),

    body('address')
      .trim()
      .notEmpty().withMessage('Address is required')
      .isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters'),

    body('city')
      .trim()
      .notEmpty().withMessage('City is required')
      .isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters'),
  ],

  delete: [
    param('id')
      .notEmpty().withMessage('User ID is required')
      .isMongoId().withMessage('Invalid user ID format'),
  ],

  getById: [
    param('id')
      .notEmpty().withMessage('User ID is required')
      .isMongoId().withMessage('Invalid user ID format'),
  ],
};

const contactValidationRules = {
  create: [
    body('firstName')
      .trim()
      .notEmpty().withMessage('First name is required')
      .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
      .isAlpha('en-US', { ignore: ' -' }).withMessage('First name must contain only letters'),

    body('lastName')
      .trim()
      .notEmpty().withMessage('Last name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
      .isAlpha('en-US', { ignore: ' -' }).withMessage('Last name must contain only letters'),

    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email address')
      .normalizeEmail(),

    body('phone')
      .trim()
      .notEmpty().withMessage('Phone is required')
      .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Phone must contain only valid characters'),

    body('address')
      .trim()
      .notEmpty().withMessage('Address is required')
      .isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters'),

    body('company')
      .trim()
      .notEmpty().withMessage('Company is required')
      .isLength({ min: 2, max: 100 }).withMessage('Company must be between 2 and 100 characters'),

    body('notes')
      .trim()
      .optional()
      .isLength({ max: 500 }).withMessage('Notes must not exceed 500 characters'),
  ],

  update: [
    param('id')
      .notEmpty().withMessage('Contact ID is required')
      .isMongoId().withMessage('Invalid contact ID format'),

    body('firstName')
      .trim()
      .notEmpty().withMessage('First name is required')
      .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
      .isAlpha('en-US', { ignore: ' -' }).withMessage('First name must contain only letters'),

    body('lastName')
      .trim()
      .notEmpty().withMessage('Last name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
      .isAlpha('en-US', { ignore: ' -' }).withMessage('Last name must contain only letters'),

    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email address')
      .normalizeEmail(),

    body('phone')
      .trim()
      .notEmpty().withMessage('Phone is required')
      .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Phone must contain only valid characters'),

    body('address')
      .trim()
      .notEmpty().withMessage('Address is required')
      .isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters'),

    body('company')
      .trim()
      .notEmpty().withMessage('Company is required')
      .isLength({ min: 2, max: 100 }).withMessage('Company must be between 2 and 100 characters'),

    body('notes')
      .trim()
      .optional()
      .isLength({ max: 500 }).withMessage('Notes must not exceed 500 characters'),
  ],

  delete: [
    param('id')
      .notEmpty().withMessage('Contact ID is required')
      .isMongoId().withMessage('Invalid contact ID format'),
  ],

  getById: [
    param('id')
      .notEmpty().withMessage('Contact ID is required')
      .isMongoId().withMessage('Invalid contact ID format'),
  ],
};

module.exports = {
  validate,
  userValidationRules,
  contactValidationRules,
};
