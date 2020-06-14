const express = require('express');
const {
  getOverView,
  getTour,
  getLogin,
  getAccount,
  updateUserData,
  getMyTours,
} = require('../controllers/viewsController');
const { isLoggedIn, protect } = require('../controllers/authController');
const { createBookingCheckout } = require('../controllers/bookingController');

const viewRouter = express.Router();

viewRouter.get('/', createBookingCheckout, isLoggedIn, getOverView);
viewRouter.get('/tour/:slug', isLoggedIn, getTour);
viewRouter.get('/login', isLoggedIn, getLogin);
viewRouter.get('/me', protect, getAccount);
viewRouter.get('/my-tours', protect, getMyTours);

viewRouter.post('/submit-user-data', protect, updateUserData);

module.exports = viewRouter;
