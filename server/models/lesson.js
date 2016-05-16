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
    type: String,
    validate: {
      validator: function(val) {
        return /.*\.(png|jp(e*)g|gif)/g.test(val);
      },
      message: '{VALUE} is not a valid image file with extension png, jpg, jpeg or gif!'
    }
  },
  problems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }]
});

mongoose.model('Lesson', LessonSchema);