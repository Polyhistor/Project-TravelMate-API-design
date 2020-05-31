const express = require('express');
const { getAllReviews, createReview } = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const reviewRouter = express.Router();

reviewRouter.route('/').get(getAllReviews).post(protect, restrictTo('user'), createReview);

module.exports = reviewRouter;
