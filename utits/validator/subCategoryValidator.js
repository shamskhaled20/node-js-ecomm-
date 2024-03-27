const { check,body} = require('express-validator');
const slugify = require('slugify');
const validationMiddleware = require('../../middleware/validatorMiddleware');

exports.getSubCategoryValidator =[
    check('id').isMongoId().withMessage('Invalid Category id'),
    validationMiddleware
];
exports.createSubCategoryValidator = [
    check('name').notEmpty().isLength({ min: 2 }).withMessage('subCategory name is too short')
        .isLength({ max: 32 }).withMessage('subCategory name is too long')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
          }),
    check('category').notEmpty().withMessage('must be related to category').isMongoId().withMessage('Invalid Category id'),
    validationMiddleware
];

exports.updateSubCategoryValidator =[
    check('id').isMongoId().withMessage('Invalid Category id'),
    body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    validationMiddleware
];
exports.deleteSubCategoryValidator =[
    check('id').isMongoId().withMessage('Invalid Category id'),
    validationMiddleware
];