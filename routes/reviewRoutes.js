const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(protect);

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user', 'admin'), setTourUserIds, createReview);
reviewRouter
  .route('/:id')
  .get(getReview)
  .delete(restrictTo('user', 'admin'), deleteReview)
  .patch(restrictTo('user', 'admin'), updateReview);

module.exports = reviewRouter;
