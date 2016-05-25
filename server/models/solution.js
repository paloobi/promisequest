var mongoose = require('mongoose');

var SolutionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  latestAttempt: String,
  latestSolution: String
});

mongoose.model('Solution', SolutionSchema);