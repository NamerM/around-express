const mongoose = require('mongoose');

const { LINK_REGEXP } = require('../constants/index');
// const linkRegExp = /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/gi;

const cardScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'The name lenghth should be at least 2 characters'],
    maxlength: [30, 'The name length should not exceed 30 characters'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => { return LINK_REGEXP.test(v) },
      message: 'Enter a Valid URL address'
    }
  },
  owner: {
    type: mongoose.Aggregate.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  likes: {
    type: [{ type: mongoose.Aggregate.Schema.Types.ObjectId, ref: 'user'}],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})



module.exports = mongoose.model('card', cardScheme);