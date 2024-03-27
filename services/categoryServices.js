const CategoryModel = require("../modules/categoryModel");
const HandlerFactory = require('./handlerFactory');
// @@desc  GET list categories
// @Route Get /api/v1/categories
// @access  public
exports.getCategories = HandlerFactory.getAll(CategoryModel);
//@desc Get  specific category by id
//@Route  Get /api/v1/categories/:id
//@access public
exports.getCategory = HandlerFactory.getOneById(CategoryModel);


// @@desc  post category
// @Route post /api/v1/category
// @access  private
exports.createCategory = HandlerFactory.createOne(CategoryModel);
//@desc update category
//@Route update /api/v1/categories/:id
//@access private
exports.updateCategory = HandlerFactory.updateOne(CategoryModel);
//@desc Delete category
//@Route Delete /api/v1/categories/:id
//@access private
exports.deleteCategory = HandlerFactory.deleteOne(CategoryModel);
