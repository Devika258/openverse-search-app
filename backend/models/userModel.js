const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  term: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  searches: [searchSchema]
});

module.exports = mongoose.model('User', userSchema);
