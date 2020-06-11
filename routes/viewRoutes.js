const express = require('express');
const { getOverView, getTour, getLogin } = require('../controllers/viewsController');
const { isLoggedIn } = require('../controllers/authController');

const viewRouter = express.Router();

viewRouter.use(isLoggedIn);

viewRouter.get('/', getOverView);
viewRouter.get('/tour/:slug', getTour);
viewRouter.get('/login', getLogin);

module.exports = viewRouter;
