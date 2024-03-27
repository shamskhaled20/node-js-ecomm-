const BrandModel = require("../modules/brandsModels");
const HandlerFactory = require('./handlerFactory');
// @@desc  GET list brands
// @Route Get /api/v1/brands
// @access  public
exports.getBrands = HandlerFactory.getAll(BrandModel);
//@desc Get  specific brand by id
//@Route  Get /api/v1/brands/:id
//@access public
exports.getBrand = HandlerFactory.getOneById(BrandModel);

// @@desc  post brand
// @Route post /api/v1/brand
// @access  private
exports.createBrand = HandlerFactory.createOne(BrandModel);
//@desc update brand
//@Route update /api/v1/brands/:id
//@access private
exports.updateBrand = HandlerFactory.updateOne(BrandModel);
//@desc Delete brand
//@Route Delete /api/v1/brands/:id
//@access private
exports.deleteBrand = HandlerFactory.deleteOne(BrandModel);
