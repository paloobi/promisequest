var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    required: true
  },
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

