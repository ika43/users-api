const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      match: [/^[a-zA-Z']+$/, 'Invalid firstname!']
    },
    lastname: {
      type: String,
      match: [/^[a-zA-Z']+$/, 'Invalid Lastname!']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: props => `${props.value} is not a valid email!`
      },
    },
    address: {
      _id: false,
      street: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String,
      },
      zip: {
        type: Number
      }
    },
    phone: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('User', userSchema);