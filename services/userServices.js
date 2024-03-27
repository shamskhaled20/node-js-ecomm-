const asyncHandler = require('express-async-handler');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const HandlerFactory = require('./handlerFactory');
const UserModel = require('../modules/userModel');
const ApiError = require('../utits/api_error');
// @@desc  GET list users
// @Route Get /api/v1/users
// @access  public
exports.getUsers = HandlerFactory.getAll(UserModel);
//@desc Get  specific user by id
//@Route  Get /api/v1/users/:id
//@access public
exports.getUser = HandlerFactory.getOneById(UserModel);

// @@desc  post user
// @Route post /api/v1/users
// @access  private
exports.createUser = HandlerFactory.createOne(UserModel);
//@desc update user
//@Route update /api/v1/users/:id
//@access private
exports.updateUser =  asyncHandler(async (req, res, next) => {
    const document = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        slug: req.body.slug,
        phone: req.body.phone,
        email: req.body.email,
        profileImg: req.body.profileImg,
        role: req.body.role,
      },
      {
        new: true,
      }
    );
  
    if (!document) {
      return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });
  exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const document = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
      },
      {
        new: true,
      }
    );
  
    if (!document) {
      return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });
//@desc Delete user
//@Route Delete /api/v1/users/:id
//@access private
exports.deleteUser = HandlerFactory.deleteOne(UserModel);
