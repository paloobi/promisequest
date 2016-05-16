var mongoose = require('mongoose');

var LessonSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  problems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }]
});

mongoose.model('Lesson', LessonSchema);