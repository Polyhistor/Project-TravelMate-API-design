const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

// Trusting proxies - for example Heroku
app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares - Development and Prod Logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Helmet - Security HTTP headers
app.use(helmet());

// Limiter for Brute-force
const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Global middlewares
// # 1 Body Parser - reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Parameter pollution prevention
// This library automatically removes duplicates, but if you whitelist it duplicates are allowed
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// test Middleware
// app.use((req, res, next) => {
//   console.log(req.cookies);
// });

// # 2 access to static files
app.use(express.static(path.join(__dirname, 'public')));

// # compressing text
app.use(compression());

// Routers
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // whenever you pass an argument to the next function, express will automatically treat it as an error and will bypass
  // all other middlewares untill it reaches the error handling middleware, in our case the next middleware we defined below
  next(new appError(`Cant' find ${req.originalUrl} on this server!`, 404));
});

// by statis 4 arguments, express takes this middleware function as the error handler middleware
app.use(globalErrorHandler);

module.exports = app;
