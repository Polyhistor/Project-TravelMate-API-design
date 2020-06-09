const express = require('express');
const { getOverView, getTour } = require('../controllers/viewsController');

const viewRouter = express.Router();

viewRouter.get('/', getOverView);
viewRouter.get('/tour/:slug', getTour);

module.exports = viewRouter;
