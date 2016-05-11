var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// require in models
var models = require('../../../server/models');
var Problem = mongoose.model('Problem');
var Test = mongoose.model('Test');
var Lesson = mongoose.model('Lesson');

describe('Lesson model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    it('should exist', function () {
        expect(Lesson).to.exist;
    });

    describe('validation', function() {

        var p1, p2;
        var t1, t2;
        beforeEach('Create dummy Test object', function(done) {
          t1 = new Test({ content: 'test1' });
          t2 = new Test({ content: 'test2' });
          p1 = new Problem({
            name: 'problem1',
            prompt: 'get started',
            starter: 'function() {}',
            test: t1._id
          });
          p2 = new Problem({
            name: 'problem2',
            prompt: 'next problem',
            starter: 'function(a,b){}',
            test: t2._id
          })
          done();
        })

        afterEach('Clear test database', function (done) {
            clearDB(done);
        });

        describe('title', function() {
          it('is required', function(done) {
            var p = new Problem({
              prompt: 'abc',
              starter: 'abc',
              test: test._id
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
              test: test._id
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
              test: test._id
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
          it('must be a valid instance of Test model', function(done){
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
