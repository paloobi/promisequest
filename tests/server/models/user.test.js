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

  describe("username", function(){
    it("is required", function() {});
    it("must be unique", function() {});
    it("can only contain alphanumeric characters and _ or - (no spaces)");
  });

  xdescribe("password", function(){
    it("is required", function() {});
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