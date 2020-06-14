const express = require('express');
const {
  getOverView,
  getTour,
  getLogin,
  getAccount,
  updateUserData,
} = require('../controllers/viewsController');
const { isLoggedIn, protect } = require('../controllers/authController');

const viewRouter = express.Router();

viewRouter.get('/', isLoggedIn, getOverView);
viewRouter.get('/tour/:slug', isLoggedIn, getTour);
viewRouter.get('/login', isLoggedIn, getLogin);
viewRouter.get('/me', protect, getAccount);

viewRouter.post('/submit-user-data', protect, updateUserData);

module.exports = viewRouter;
