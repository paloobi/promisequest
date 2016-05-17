var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

// require in models
var models = require('../../../server/models');
var Problem = mongoose.model('Problem');
var Checker = mongoose.model('Checker');

describe("Solution model", function() {

  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) done();
    mongoose.connect(dbURI, done);
  });

  it('should exist', function(){
    expect(Solution).to.exist;
  })

  describe('validation', function() {

    afterEach('Clear DB', function(done) {
      clearDB(done);
    });

    describe("user", function() {

      it("is required", function(done) {

      });

      it("must be a valid user ID", function(done) {

      });

    });
    
    describe("problem", function() {

      it("is required", function(done) {

      });

      it("must be a valid problem ID", function(done){

      });
    })
    
    describe("latestAttempt", function() {

      it("is optional", function(done) {

      });

      it("can be set to a string value", function(done) {

      });

    });

    describe("latestSolution", function() {

      it("is optional", function(done) {

      });

      it("can be set to a string value", function(done) {

      });

    });

  });

});