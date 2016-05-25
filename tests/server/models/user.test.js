var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');
var sinon = require('sinon');

// require in models
var models = require('../../../server/models');
var User = mongoose.model('User');

describe("User model", function() {

  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear DB', function(done) {
    clearDB(done);
  });

  describe("username", function(){
    it("is required", function(done) {
      var user = new User({
        password: '12345',
        email: 'test@test.test'
      });
      user.validate().then(function() {
        var err = new Error('validated user with no username');
        done(err);
      }, function(err) {
        expect(err).to.exist;
        done();
      })
    });

    it("must be unique", function(done) {
      User.create({
        username: 'hamlet',
        password: '12345',
        email: 'test@test.test'
      }).then(function(user) {
        var user2 = new User({
          username: 'hamlet',
          password: '67890',
          email: 'test@test.com'
        });
        return user2.validate();
      }, function(err) {
        done(err);
      }).then(function(){
        var err = new Error('Saved user with existing username');
        done(err);
      }, function(err) {
        expect(err).to.exist;
        done(err);
      });
    });

    it("can only contain alphanumeric characters and _ or - (no spaces)", function(done) {
      var nonAlpha = new User({
        username: '%^#fo',
        password: '12345',
        email: 'test@test.test'
      });
      var spaces = new User({
        username: 'blah blah',
        password: '12345',
        email: 'test@test.com'
      });
      nonAlpha.validate().then(function(user){
        var err = new Error('Accepted username with non-alphanumeric characters: ' + user.username);
        done(err);
      }, function(err) {
        expect(err).to.exist;
        return spaces.validate()
      }).then(function(user) {
        var err = new Error("Accepted username with whitespace characters: " + user.username);
        done(err);
      }, function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it("cannot be less than 4 characters long", function(done) {
      var user = new User({
        username: 'bob',
        password: '12345',
        email: 'test@test.test'
      })
      user.validate().then(function() {
        var err = new Error("Accepted user with username under 4 characters long");
        done(err);
      }, function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it("cannot be more than 20 characters long", function(done) {
      var user = new User({
        username: 'abcdefghijklmnopqrstuvwxyz',
        email: 'test@test.test'
      });
      user.validate().then(function() {
        var err = new Error("Accepted new user with username over 20 characters long");
        done(err);
      }, function(err) {
        expect(err).to.exist;
        done();
      });

    });

  });

  describe("password", function(){

    it("is required", function(done) {
      var user = new User({
        username: 'test',
        email: 'test@test.test',
      })
      user.validate()
      .then(function() {
        var err = new Error('User created without password');
        done(err);
      }, function(err) {
        expect(err).to.exist;
        done();
      })
    });

    describe("encryption", function() {

      describe('generateSalt static', function () {

        it("should exist", function(){
          expect(User.generateSalt).to.be.a('function');
        });

        it('should return a random string', function() {
          var string1 = User.generateSalt();
          var string2 = User.generateSalt();
          expect(string1).to.be.a('string');
          expect(string2).to.be.a('string');
          expect(string1).to.not.equal(string2);
        });

      });

      describe("encryptPassword static", function(){

        var cryptoStub, hashUpdateSpy, hashDigestStub;
        beforeEach('setup hash and cryptostubs and spies', function() {
          cryptoStub = sinon.stub(require('crypto'), 'createHash');
          hashUpdateSpy = sinon.spy();
          hashDigestStub = sinon.stub();
          cryptoStub.returns({
            update: hashUpdateSpy,
            digest: hashDigestStub
          });
        });

        afterEach('restore stubs', function(){
          cryptoStub.restore();
        });

        it('should exist', function() {
          expect(User.encryptPassword).to.be.a('function');
        });

        it('should call crypto.createHash with "sha1" method', function() {
          User.encryptPassword('asd', 'jkl');
          expect(cryptoStub.calledWith('sha1')).to.be.ok;
        });

        it('should call hash.update with the first and second argument, in that order', function() {
          var pass = 'password';
          var salt = 'qwertyuiop';
          User.encryptPassword(pass, salt);
          expect(hashUpdateSpy.getCall(0).args[0]).to.equal(pass);
          expect(hashUpdateSpy.getCall(1).args[0]).to.equal(salt);
        });

        it('should call hash.digest with hex and return the result', function() {
          var x = {};
          hashDigestStub.returns(x);

          var e = User.encryptPassword('asdf', 'qwert');
          expect(hashDigestStub.calledWith('hex')).to.be.ok;
          expect(e).to.be.equal(x);
        });


      });

      describe("on user creation", function() {

        var encryptSpy, saltSpy;

        var createUser = function(){
          return User.create({email: 'test@test.test', username: 'testuser', password: '12345'});
        }

        beforeEach('initiate encrypt and salt spies', function() {
          encryptSpy = sinon.spy(User, 'encryptPassword');
          saltSpy = sinon.spy(User, 'generateSalt');
        });

        afterEach('restore spies', function() {
          encryptSpy.restore();
          saltSpy.restore();
        });

        it('should call User.encryptPassword with given password and newly generated salt', function (done) {
          createUser().then(function() {
            var generatedSalt = saltSpy.getCall(0).returnValue;
            expect(encryptSpy.calledWith('12345', generatedSalt)).to.be.ok;
            done();
          });
        });

        it('should set the user salt to the generated salt', function(done) {
          createUser().then(function(user){
            var generatedSalt = saltSpy.getCall(0).returnValue;
            expect(user.salt).to.equal(generatedSalt);
            done();
          });
        });

        it('should set user password to hashed password', function(done) {
          createUser().then(function(user){
            var createdPassword = encryptSpy.getCall(0).returnValue;
            expect(user.password).to.equal(createdPassword);
            done();
          });
        });

      });


    });

  });

  describe("email", function(){
    it("is required", function(done){
      var user = new User({
        username: 'test',
        password: '12345'
      });
      user.validate().then(function() {
        var err = new Error("Accepted user without email");
        done(err);
      }, function(err) {
        expect(err).to.exist;
        done();
      });
    });

    it("must be in email format", function(done) {
      var user = new User({
        username: 'test',
        password: '12345',
        email: 'notanemail'
      });
      user.validate().then(function(){
        var err = new Error('Accepted user with invalid email address');
        done(err);
      }, function(err) {
        expect(err).to.exist;
        done();
      });
    });

  });

  xdescribe("google", function(){

  });

  xdescribe("github", function(){

  });

  describe("score", function(){
    it("defaults to 0", function(){
      var user = new User({
        username: 'testuser',
        password: '12345',
        email: 'test@test.test'
      });
      expect(user.score).to.equal(0);
    });
  });

  describe("progress", function(){
    it("defaults to 0", function(){
      var user = new User({
        username: 'testuser',
        password: '12345',
        email: 'test@test.test'
      });
      expect(user.progress).to.equal(0);
    });
  });

});