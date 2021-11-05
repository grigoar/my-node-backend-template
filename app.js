const express = require('express');
const morgan = require('morgan');

// const logger = require('./utils/logger');

const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json());

console.log(process.env.NODE_ENV);
//setup morgan for logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// logger.log('info', 'hello', { message: ' i am happy to log my errors' });
// logger.log('error', 'hello this is some error logging test');
// logger.info('world');
// logger.error('This is serious');

// app.get('/', (req, res) => {
//   res.send('Hello Node.js world!');
// });

// app.get('/users',getAllUsers);
// app.post('/users', createUser);
// app.get('/users/:id', getUser);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
