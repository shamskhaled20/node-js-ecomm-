const express = require('express');
const { getUserValidator,
    createUserValidator,
    deleteUserValidator,
    updateUserValidator,
  changeUserPasswordValidator
} = require('../utits/validator/userValidator')
const { getUsers,
    getUser,
    createUser ,
    updateUser,
    deleteUser,
    changeUserPassword
} = require('../services/userServices');

const router = express.Router();
// Routes
router.put('/changePassword/:id',changeUserPasswordValidator,changeUserPassword);
router.route('/').get(getUsers).
post( createUserValidator,createUser);
router.route('/:id').
get(getUserValidator,getUser).
put(updateUserValidator, updateUser).
delete(deleteUserValidator, deleteUser);
module.exports = router;
