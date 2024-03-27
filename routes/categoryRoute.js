const express = require('express');
const { getCategoryValidator,createCategoryValidator,deleteCategoryValidator,updateCategoryValidator} = require('../utits/validator/categoryValidator')
const { getCategories,
    getCategory,
    createCategory ,
    updateCategory,
    deleteCategory
} = require('../services/categoryServices');
const subCategoriesRoute = require('./subCategoryRoute');

const authService = require('../services/authServices');

const router = express.Router();
router.use('/:categoryId/subcategories',subCategoriesRoute);
// Routes
router.route('/').get(getCategories).
post( authService.protect,
    createCategoryValidator,createCategory);
router.route('/:id').
get(getCategoryValidator,getCategory).
put(updateCategoryValidator,updateCategory).
delete(deleteCategoryValidator,deleteCategory);
module.exports = router;
