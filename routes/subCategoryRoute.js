const express = require('express');

const {createSubCategory,
     getSubCategories,
     getSubCategory,
     updateSubCategory,
     deleteSubCategory,
     setCategoryById
} = require('../services/subCategoryServices');
const {createSubCategoryValidator,
    getSubCategoryValidator,
   updateSubCategoryValidator,
   deleteSubCategoryValidator,
} = require('../utits/validator/subCategoryValidator');
// mergeParams : allow us to access parameters on other route
// ex : we need to access the categoryId from category
const router = express.Router({mergeParams:true});
router.route('/')
    .post(setCategoryById, createSubCategoryValidator, createSubCategory)
    .get(getSubCategoryValidator, getSubCategories);
router.route('/:id').get(getSubCategoryValidator,getSubCategory).
put(updateSubCategoryValidator,updateSubCategory).
delete(deleteSubCategoryValidator,deleteSubCategory);

module.exports = router;