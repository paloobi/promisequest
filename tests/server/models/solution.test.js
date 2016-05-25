var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

// require in models
var models = require('../../../server/models');
var Problem = mongoose.model('Problem');
var User = mongoose.model('User');
var Solution = mongoose.model('Solution');

describe("Solution model", function() {

  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  it('should exist', function(){
    expect(Solution).to.exist;
  })

  describe('validation', function() {

    var problem, user;
    beforeEach('Create dummy problem and user', function(){
      problem = new Problem({});
      user = new User({});
    })

    afterEach('Clear DB', function(done) {
      clearDB(done);
    });

    describe("user", function() {

      it("is required", function(done) {
        var solution = new Solution({
          problem: problem._id
        });
        solution.validate()
        .then(function() {
          var err = new Error('solution was validated without user');
          done(err);
        }, function(err) {
          expect(err).to.exist;
          done();
        })
        .catch(done);
      });

      it("must be a valid user ID", function(done) {
        var solution = new Solution({
          user: "notamongoid",
          problem: problem._id
        });
        solution.validate()
        .then(function() {
          var err = new Error('solution was validated with invalid user ID');
          done(err);
        }, function(err) {
          expect(err).to.exist;
          done();
        })
        .catch(done);
      });

    });
    
    describe("problem", function() {

      it("is required", function(done) {
        var solution = new Solution({
          user: user._id
        });
        solution.validate()
        .then(function() {
          var err = new Error('solution validated without valid problem object');
          done(err);
        }, function(err) {
          expect(err).to.exist;
          done();
        })
        .catch(done);
      });

      it("must be a valid problem ID", function(done){
        var solution = new Solution({
          user: user._id,
          problem: "notamongoid"
        });
        solution.validate()
        .then(function() {
          var err = new Error('solution validated with invalid problem ID');
          done(err)
        }, function(err) {
          expect(err).to.exist;
          done();
        })
        .catch(done);
      });
    })
    
    describe("latestAttempt", function() {

      it("is optional", function(done) {
        Solution.create({
          user: user._id,
          problem: problem._id
        })
        .then(function(s) {
          expect(s).to.exist;
          done();
        })
        .catch(done);
      });

      it("can be set to a string value", function(done) {
        var solution = new Solution({
          user: user._id,
          problem: problem._id,
          latestAttempt: "function(){}"
        });
        solution.validate()
        .then(function(s){
          expect(s).to.exist;
          done();
        })
        .catch(done);
      });

    });

    describe("latestSolution", function() {

      it("is optional", function(done) {
        Solution.create({
          user: user._id,
          problem: problem._id
        })
        .then(function(s) {
          expect(s).to.exist;
          done();
        })
        .catch(done);
      });

      it("can be set to a string value", function(done) {
        var solution = new Solution({
          user: user._id,
          problem: problem._id,
          latestSolution: "function(){ console.log('success') }"
        })
        solution.validate()
        .then(function(s) {
          expect(s).to.exist;
          done();
        })
        .catch(done);
      });

    });

  });

});