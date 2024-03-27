const productModel = require("../modules/productModel");
const HandlerFactory = require('./handlerFactory');
// @@desc  GET list products
// @Route Get /api/v1/Products
// @access  public
exports.getProducts = HandlerFactory.getAll(productModel,'Products');
//@desc Get  specific product by id
//@Route  Get /api/v1/products/:id
//@access public
exports.getProduct = HandlerFactory.getOneById(productModel);
// @@desc  post product
// @Route post /api/v1/product
// @access  private
exports.createProduct = HandlerFactory.createOne(productModel);


//@desc update product
//@Route update /api/v1/products/:id
//@access private
exports.updateProduct = HandlerFactory.updateOne(productModel);
//@desc Delete product
//@Route Delete /api/v1/products/:id
//@access private
exports.deleteProduct = HandlerFactory.deleteOne(productModel);
