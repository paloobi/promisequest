var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// require in models
var models = require('../../../server/models');
var Problem = mongoose.model('Problem');
var Test = mongoose.model('Test');

describe('Test model', function () {

  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
  });

  it('should exist', function () {
      expect(Test).to.exist;
  });

  describe('validation', function() {

    describe('content', function() {

      it('is required', function(done) {
        var t = new Test();
        t.validate()
        .then(function() {
          var err = new Error('test passed validation without content');
          done(err);
        }, function(err) {
          expect(err).to.exist;
          done();
        });
      });

    });

  });


});
