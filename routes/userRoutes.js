const express = require('express');
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { signUp } = require('../controllers/authController');

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
