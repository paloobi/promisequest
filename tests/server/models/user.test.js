var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

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

      describe('generateSalt method', function () {

        it("should exist", function(){
          expect(User.generateSalt).to.be.a('function');
        });

        

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