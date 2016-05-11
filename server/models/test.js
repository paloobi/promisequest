var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

mongoose.model('Test', TestSchema);