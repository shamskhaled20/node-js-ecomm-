const express = require('express');
const { getBrandValidator,
    createBrandValidator,
    deleteBrandValidator,
    updateBrandValidator} = require('../utits/validator/brandValidator')
const { getBrands,
    getBrand,
    createBrand ,
    updateBrand,
    deleteBrand
} = require('../services/brandServices');

const router = express.Router();
// Routes
router.route('/').get(getBrands).
post(createBrandValidator,createBrand);
router.route('/:id').
get(getBrandValidator,getBrand).
put(updateBrandValidator,updateBrand).
delete(deleteBrandValidator,deleteBrand);
module.exports = router;
