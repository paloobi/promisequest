var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validation: {
      validator: function(val) {
        return /[A-Za-z\-\_].{4, 20}/g.test(val);
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  email: {
    type: String,
    required: true
  },
  google: {
    id: String
  },
  github: {
    id: String
  },
  score: Number,
  progress: Number
});

UserSchema.statics.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
}

UserSchema.statics.encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

UserSchema.pre('save', function(next) {
  if (!this.salt) this.salt = this.constructor.generateSalt();
  if (this.isModified('password')) {
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }
  next();
});

mongoose.model('User', UserSchema);

