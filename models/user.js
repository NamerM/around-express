const mongoose = require('mongoose');

const { LINK_REGEXP } = require('../constants/index');

//const LINK_REGEXP = /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/gi;

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => { return LINK_REGEXP.test(v) },
      message: 'Enter a Valid Avatar address'
    }
  },
})

module.exports = mongoose.model('user', userScheme);