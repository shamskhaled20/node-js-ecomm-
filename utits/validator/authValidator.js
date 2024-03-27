const { check,} = require('express-validator');
const slugify = require('slugify');
const UserModel = require('../../modules/userModel');
const validationMiddleware = require('../../middleware/validatorMiddleware');

exports.signUpValidator = [
 check('name').notEmpty().
 isLength({min:3}).withMessage('Brand name is too short')
 .isLength({max:32}).withMessage('Brand name is too long')
 .custom((val, { req }) => {
   req.body.slug = slugify(val);
   return true;
 }, ),
  check('email').notEmpty().withMessage('email is required')
 .isEmail().withMessage('invailed email address')
 .custom((val)=> UserModel.findOne({email:val}).then((User)=>{
if(User){
    return Promise.reject(new Error("this mail already signup got to login"));
}
 })),
 check('password')
 .notEmpty()
 .withMessage('Password required')
 .isLength({ min: 6 })
 .withMessage('Password must be at least 6 characters')
 .custom((password, { req }) => {
   if (password !== req.body.passwordConfirm) {
     throw new Error('Password Confirmation incorrect');
   }
   return true;
 }),
 check('passwordConfirm')
 .notEmpty()
 .withMessage('Password confirmation required'),
 validationMiddleware
];
exports.loginValidator = [
    check('email')
      .notEmpty()
      .withMessage('Email required')
      .isEmail()
      .withMessage('Invalid email address'),
  
    check('password')
      .notEmpty()
      .withMessage('Password required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  
    validationMiddleware,
  ];