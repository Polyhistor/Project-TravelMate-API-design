const express = require('express');
const morgan = require('morgan');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // whenever you pass an argument to the next function, express will automatically treat it as an error and will bypass
  // all other middlewares untill it reaches the error handling middleware, in our case the next middleware we defined below
  next(new appError(`Cant' find ${req.originalUrl} on this server!`, 404));
});

// by statis 4 arguments, express takes this middleware function as the error handler middleware
app.use(globalErrorHandler);

module.exports = app;
