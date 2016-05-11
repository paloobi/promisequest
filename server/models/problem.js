var mongoose = require('mongoose');

var ProblemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prompt: String,
  starter: String
});

mongoose.model('Problem', ProblemSchema);