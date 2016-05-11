var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// require in models
var models = require('../../../server/models/problem');
var Problem = mongoose.model('Problem');
// var Test = models.Test;

describe('Problem model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    // var test;
    // beforeEach('Create dummy Test', function(done) {
    //   test = new Test();
    // });

    it('should exist', function () {
        expect(Problem).to.exist;
    });

    describe('validation', function() {

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });

        describe('name', function() {
          it('is required', function(done) {
            var p = new Problem({
              prompt: 'abc',
              starter: 'abc',
              test: 'abc'
            });
            p.validate()
            .then(function() {
              var err = new Error('problem passed validation without a name');
              done(err);
            }, function(err) {
              expect(err).to.exist;
              done();
            })
          });
        });

        describe('prompt', function() {
          it('is required', function(done) {
            var p = new Problem({
              name: 'abc',
              starter: 'abc',
              test: 'abc'
            });
            p.validate()
            .then(function() {
              var err = new Error('problem passed validation without prompt');
              done(err);
            },
            function(err) {
              expect(err).to.exist;
              done();
            });
          });
        });

        describe('starter', function() {
          it('is required', function(done) {
            var p = new Problem({
              name: 'abc',
              prompt: 'abc',
              test: 'abc'
            });
            p.validate()
            .then(function() {
              var err = new Error('problem passed validation without starter');
              done(err);
            },
            function(err) {
              expect(err).to.exist;
              done();
            })
          });
        });

        describe('test', function() {
          it('is required', function(done) {
            var p = new Problem({
              name: 'abc',
              prompt: 'abc',
              starter: 'abc'
            });
            p.validate()
            .then(function() {
              var err = new Error('problem passed validation without test');
              done(err);
            },
            function(err) {
              expect(err).to.exist;
              done();
            })
          });
          xit('must be a valid instance of Test model', function(done){
            var p = new Problem({
              name: 'abc',
              prompt: 'abc',
              starter: 'abc',
              test: 'notamongoid'
            });
            p.validate()
            .then(function() {
              var err = new Error('problem with invalid test ID passed validation');
              done(err);
            },
            function(err) {
              expect(err).to.exist;
              done();
            })
          });
        });

    });

    xdescribe('virtuals', function() {
    });

    xdescribe('methods', function() {
    });

});
