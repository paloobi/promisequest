var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
  email: String,
  google: {
    id: String
  },
  github: {
    id: String
  },
  score: Number,
  progress: Number
});

mongoose.model('User', UserSchema);