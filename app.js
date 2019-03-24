// * import all dependencies
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
//const winston = require('winston');

// * load routes
const userRouter = require('./api/user/user.routes');

// * setup winston logger 
//winston.configure({
//  transports: [
//    new winston.transports.File({ filename: `${__dirname}/log/errors.log` })
//  ]
//});

// * connect to database
const dbConfig = config.get('db.dbConfig');
mongoose.connect(dbConfig, { useNewUrlParser: true, useCreateIndex: true }, (error) => {
  if (error) {
    console.error('Mongo error', error);
  } else {
    console.log("Connected to database!")
  }
});


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * setup routes
app.use('/api/v0.1/users', userRouter);


module.exports = app;
