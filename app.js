// * import all dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// * load routes
const userRouter = require('./api/user/user.routes');

// * connect to database
mongoose.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex: true }, (error) => {
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
