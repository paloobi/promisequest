var mongoose = require('mongoose');

var CheckerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

mongoose.model('Checker', CheckerSchema);