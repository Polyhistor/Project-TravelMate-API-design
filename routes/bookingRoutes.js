const express = require('express');
const {
  getCheckoutSession,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getAllBooking,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');

const bookingRouter = express.Router();

bookingRouter.use(protect);

bookingRouter.get('/checkout-session/:tourID', getCheckoutSession);

bookingRouter.use(restrictTo('admin', 'lead-guide'));

bookingRouter.get('/', getAllBooking);
bookingRouter.get('/:id', getBooking).patch('/:id', updateBooking).delete('/:id', deleteBooking);
bookingRouter.post('/', createBooking);

module.exports = bookingRouter;
