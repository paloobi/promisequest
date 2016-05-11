var mongoose = require('mongoose');

var ProblemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  starter: {
    type: String,
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

mongoose.model('Problem', ProblemSchema);