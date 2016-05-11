var mongoose = require('mongoose');

var ProblemSchema = new mongoose.Schema({
  name: String,
  prompt: String,
  starter: String
});

mongoose.model('Problem', ProblemSchema);