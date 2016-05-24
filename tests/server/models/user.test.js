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
    if (mongoose.connection.db) done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear DB', function(done) {
    clearDB(done)
  });

  xdescribe("username", function(){
    it("is required", function(done) {});
    it("must be unique", function() {});
    it("can only contain alphanumeric characters and _ or - (no spaces)");
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
        done()
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

        it('should call hash.update with the first and second argument', function() {
          var pass = 'password';
          var salt = 'qwertyuiop';
          User.encryptPassword(pass, salt);
          expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
          expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);
        });

        it('should call hash.digest with hex and return the result', function() {
          var x = {};
          hashDigestStub.returns(x);

          var e = User.encryptPassword('asdf', 'qwert');
          expect(hashDigestStub.calledWith('hex')).to.be.ok;
          expect(e).to.be.equal(x);
        })


      });

      describe("on user creation", function() {

        var encryptSpy, saltSpy;

        var createUser = function(){
          return User.create({email: 'test@test.test', username: 'testuser', password: '12345'});
        }
      });


    });

  });

  describe("email", function(){
    it("is required", function(){});
  });

  describe("google", function(){

  });

  descibe("github", function(){

  });

  describe("score", function(){
    it("defaults to 0", function(){});
  });

  describe("progress", function(){
    it("defaults to 0", function(){});
  });

});