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

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user', 'admin'), setTourUserIds, createReview);
reviewRouter.route('/:id').get(getReview).delete(deleteReview).patch(updateReview);

module.exports = reviewRouter;
