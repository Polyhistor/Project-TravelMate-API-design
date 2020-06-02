const express = require('express');
const { getAllReviews, createReview, deleteReview } = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route('/').get(getAllReviews).post(protect, restrictTo('user'), createReview);
reviewRouter.route('/:id').delete(deleteReview);

module.exports = reviewRouter;
