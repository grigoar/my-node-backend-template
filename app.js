const express = require('express');
// const morgan = require('morgan');
const winston = require('winston');

const app = express();

console.log(process.env.NODE_ENV);
//setup morgan for logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

//setup winston for logging in production
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

app.get('/', (req, res) => {
  res.send('Hello Node.js world!');
});

module.exports = app;
