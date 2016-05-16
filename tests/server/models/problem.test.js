var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// require in models
var models = require('../../../server/models');
var Problem = mongoose.model('Problem');
var Checker = mongoose.model('Checker');

describe('Problem model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    it('should exist', function () {
        expect(Problem).to.exist;
    });

    describe('validation', function() {

        var checker;
        beforeEach('Create dummy Checker object', function(done) {
          checker = new Checker({
            content: 'abc'
          });
          done();
        })

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });

        describe('name', function() {
          it('is required', function(done) {
            var problem = new Problem({
              prompt: 'abc',
              starter: 'abc',
              checker: checker._id
            });
            problem.validate()
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
            var problem = new Problem({
              name: 'abc',
              starter: 'abc',
              checker: checker._id
            });
            problem.validate()
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
            var problem = new Problem({
              name: 'abc',
              prompt: 'abc',
              checker: checker._id
            });
            problem.validate()
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

        describe('checker', function() {
          it('is required', function(done) {
            var problem = new Problem({
              name: 'abc',
              prompt: 'abc',
              starter: 'abc'
            });
            problem.validate()
            .then(function() {
              var err = new Error('problem passed validation without checker');
              done(err);
            },
            function(err) {
              expect(err).to.exist;
              done();
            })
          });
          it('must be a valid instance of Checker model', function(done){
            var problem = new Problem({
              name: 'abc',
              prompt: 'abc',
              starter: 'abc',
              checker: 'notamongoid'
            });
            problem.validate()
            .then(function() {
              var err = new Error('problem with invalid checker ID passed validation');
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
