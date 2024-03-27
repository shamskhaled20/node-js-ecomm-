const {check,body} = require('express-validator');
const slugify = require('slugify');
const validationMiddleware= require('../../middleware/validatorMiddleware');
const Category = require('../../modules/categoryModel');
const subCategory = require('../../modules/subCategoryModel');
const { findById } = require('../../modules/brandsModels');

exports.createProductValidator = [
    check('title').isLength({min:3})
    .withMessage('must be atleast 3 chars').
    notEmpty().
    withMessage('product required'),
    check('description')
    .notEmpty()
    .withMessage('product description is required')
    .isLength({max:2000})
    .withMessage('too long description')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    check('quantity')
    .notEmpty()
    .withMessage('product quantity is required')
    .isNumeric()
    .withMessage('product quantity must be number'),
    check('sold').optional()
    .isNumeric()
    .withMessage('product quantity must be number'),
    check('price').notEmpty()
    .withMessage('product price is required')
    .isNumeric()
    .withMessage('product price must be number')
    .isLength({max:32})
    .withMessage('the price is too long'),
    check('priceAfterDiscount').optional().toFloat().isNumeric()
    .withMessage(' priceAfterDiscount must be number')
    .custom((value,{req})=>{
        if(req.body.price <= value){
            throw new Error(' priceAfterDiscount must be lower than price');
        }
        return true;
    }),
    check('colors').optional().isArray()
    .withMessage('available colors should be array of strings'),
    check('imageCover').notEmpty().withMessage('product image cover required'),
    check('images').optional().isArray().withMessage('images should be array of string'),
    check('category').notEmpty()
    .withMessage('product must be belong to category')
    .isMongoId().withMessage('invalid id format').custom((categoryId)=> Category.findById(categoryId).then((category)=>{
        if(!category){
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('no category for this id ');
        }
    })),
    check('subCategory').optional()
    .isMongoId().withMessage('invalid id format')
    .custom((subCategoryId)=> subCategory.find({_id:{$exists:true,$in:subCategoryId}}).then((result)=>{
        if(result.length < 1 || result.length !== subCategoryId.length){
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('no subcategory for this id ');
        }
    }))
    .custom((val, { req }) =>
      subCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subcategory) => {
            subCategoriesIdsInDB.push(subcategory._id.toString());
          });
          // check if subcategories ids in db include subcategories in req.body (true)
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
            );
          }
        }
      )
    ),
    check('Brand').optional()
    .isMongoId().withMessage('invalid id format'),
    check('ratingAverage').optional().isNumeric()
    .withMessage('ratingAverage must be number')
    .isLength({min:1}).withMessage("must be more than 1")
    .isLength({max:5}).withMessage('max number in rating is 5'),
    check('ratingQuantity').optional().isNumeric()
    .withMessage('ratingQuantity must be number'),
    validationMiddleware
];
exports.getProductValidator = [
    check('id').isMongoId().withMessage('invailed id'),
    validationMiddleware
];
exports.updateProductValidator = [
    check('id').isMongoId().withMessage('invailed id'),
    body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    validationMiddleware
];
exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('invailed id'),
    validationMiddleware
];