var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// require in Problem model
var Problem = require('../../../server/models/problem');

describe('Problem model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Problem).to.be.a('function');
    });

    describe('validation', function(done) {

        describe('name', function(){
          it('is required', function() {
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
            })
          });
        });

        describe('prompt', function() {
          it('is required', function(){});
        });

        describe('starter', function(){
          it('is required', function(){});
        });

        describe('test', function(){
          it('is required', function(){});
          it('must be a valid instance of Test model', function(){});
        });
    });

    xdescribe('virtuals', function() {
    });

    xdescribe('methods', function() {
    });

});
