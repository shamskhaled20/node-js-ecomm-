const subCategoryModel = require("../modules/subCategoryModel");
const HandlerFactory = require('./handlerFactory');

exports.setCategoryIdToBody = (req, res, next) => {
    // Nested route (Create)
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
  };
  
exports.setCategoryById = (req, res, next) => {
    if (!req.body.category && req.params.categoryId) {
        req.body.category = req.params.categoryId;
    }
    next();
};
// @@desc  post subcategory
// @Route post /api/v1/subcategory
// @access  private
exports.createSubCategory = HandlerFactory.createOne(subCategoryModel);
// @@desc  GET list subcategories
// @Route Get /api/v1/subcategories
// @access  public
exports.getSubCategories = HandlerFactory.getAll(subCategoryModel);
//@desc Get  specific subcategory by id
//@Route  Get /api/v1/subcategories/:id
//@access public
exports.getSubCategory = HandlerFactory.getOneById(subCategoryModel);
//@desc update subcategory
//@Route update /api/v1/subcategories/:id
//@access private
exports.updateSubCategory = HandlerFactory.updateOne(subCategoryModel);
//@desc Delete category
//@Route Delete /api/v1/categories/:id
//@access private
exports.deleteSubCategory  = HandlerFactory.deleteOne(subCategoryModel);