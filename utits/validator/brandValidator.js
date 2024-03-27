const { check, body} = require('express-validator');
const slugify = require('slugify');
const validationMiddleware = require('../../middleware/validatorMiddleware');

exports.getBrandValidator =[
    check('id').isMongoId().withMessage('Invalid Brand id'),
    validationMiddleware
];
exports.createBrandValidator = [
 check('name').notEmpty().
 isLength({min:3}).withMessage('Brand name is too short')
 .isLength({max:32}).withMessage('Brand name is too long')
 .custom((val, { req }) => {
   req.body.slug = slugify(val);
   return true;
 }),
 validationMiddleware
];
exports.updateBrandValidator =[
    check('id').isMongoId().withMessage('Invalid Brand id'),
    // eslint-disable-next-line no-undef
    body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    validationMiddleware
];
exports.deleteBrandValidator =[
    check('id').isMongoId().withMessage('Invalid Brand id'),
    validationMiddleware
];