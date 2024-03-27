const express = require('express');
const { signUpValidator,
    loginValidator
} = require('../utits/validator/authValidator')
const { SignUp,login
} = require('../services/authServices');

const router = express.Router();
// Routes
router.route('/SignUp').
post( signUpValidator,SignUp);
router.route('/Login').
post( loginValidator,login);
module.exports = router;