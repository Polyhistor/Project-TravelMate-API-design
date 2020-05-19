const mongoose = require('mongoose');
const dotenv = require('dotenv');

// listens on the process synchronous errors
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('uncaught exception');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection established'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('server listening');
});

// listens on the process asynchronous errors
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection');
  server.close(() => {
    process.exit(1);
  });
});
