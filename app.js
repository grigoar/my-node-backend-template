const express = require('express');
const morgan = require('morgan');

const app = express();

console.log(process.env.NODE_ENV);
//setup morgan for logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello Node.js world!');
});

module.exports = app;
