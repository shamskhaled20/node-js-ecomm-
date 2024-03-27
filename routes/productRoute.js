const express = require('express');
const { getProductValidator, 
    createProductValidator,
     deleteProductValidator, 
     updateProductValidator } = require('../utits/validator/productValidator');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../services/productServices');

const router = express.Router();

// Routes
router.route('/')
  .get(getProducts)
  .post(createProductValidator, createProduct); // Check this line for the error

router.route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
