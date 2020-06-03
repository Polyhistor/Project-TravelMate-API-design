const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require('../controllers/authController');

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/forgotPassword').patch(forgotPassword);
userRouter.route('/resetPassword/:id').patch(resetPassword);

// Middlewares run in sequence. All the middlewares after this have already gone through protect
userRouter.use(protect);

userRouter.route('/updatePassword').patch(updatePassword);
userRouter.route('/me').get(getMe, getUser);
userRouter.route('/updateMe').patch(updateMe);
userRouter.route('/deleteMe').delete(deleteMe);

// Only routes defined after this middleware are restricted to admin
userRouter.use(restrictTo('admin'));

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
