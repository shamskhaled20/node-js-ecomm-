const { check,body} = require('express-validator');
const slugify = require('slugify');
const validationMiddleware = require('../../middleware/validatorMiddleware');

exports.getCategoryValidator =[
    check('id').isMongoId().withMessage('Invalid Category id'),
    validationMiddleware
];
exports.createCategoryValidator = [
 check('name').notEmpty().
 isLength({min:3}).withMessage('Category name is too short')
 .isLength({max:32}).withMessage('Category name is too long')
 .custom((val, { req }) => {
   req.body.slug = slugify(val);
   return true;
 }),
 validationMiddleware
];
exports.updateCategoryValidator =[
    check('id').isMongoId().withMessage('Invalid Category id'),
    body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    validationMiddleware
];
exports.deleteCategoryValidator =[
    check('id').isMongoId().withMessage('Invalid Category id'),
    validationMiddleware
];