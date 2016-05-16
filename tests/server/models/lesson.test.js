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
        expect(Lesason).to.exist;
    });

    describe('validation', function() {

        var p1, p2;
        var t1, t2;
        beforeEach('Create dummy Lesson object', function(done) {
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
            var lesson = new Lesson({
              description: 'Get started',
              picture: 'l1.png',
              problems: ['p1', 'p2']
            });
            lesson.validate()
            .then(function() {
              var err = new Error('lesson passed validation without a title');
              done(err);
            }, function(err) {
              expect(err).to.exist;
              done();
            })
          });
        });

        describe('description', function() {
          it('is required', function(done) {
            var lesson = new Lesson({
              title: 'Lesson 1',
              picture: 'l1.png',
              problems: ['p1', 'p2']
            });
            lesson.validate()
            .then(function() {
              var err = new Error('lesson passed validation without description');
              done(err);
            },
            function(err) {
              expect(err).to.exist;
              done();
            });
          });
        });

        describe('picture', function() {

          beforeEach('Created lesson without picture')

          it('is optional', function(done) {
            var lesson = new Lesson({
              title: 'Lesson 1',
              description: 'Get started',
              problems: [p1, p2]
            });
            lesson.validate()
            .then(function(){
              done();
            })
          })

          it('must have image file ending (png, jpeg, jpg, or gif)', function(done) {
            var lesson = new Lesson({
              title: 'Lesson 1',
              description: 'Get started',
              picture: 'l1',
              problems: [p1, p2]
            });
            lesson.validate()
            .then(function() {
              var err = new Error('lesson picture passed validation with invalid file extension');
              done(err);
            },
            function(err) {
              expect(err).to.exist;
              var lesson2 = new Lesson({
                title: 'Lesson 2',
                description: 'More info',
                picture: 'l2.tiff',
                problems: [p1, p2]
              })
              done();
            })
            .catch(function(err) {
              expect(err).to.exist;
              done();
            });
          });

          it('supports png, jpeg, jpg, and gif', function(done) {
            var fileTypes = ['png', 'jpeg', 'jpg', 'gif'];
            var lessonPromises = [];
            for (var i of fileTypes) {
              var fileName = 'li.' + i;
              var lesson = new Lesson({
                title: 'Lesson 1',
                description: 'Get started',
                picture: fileName,
                problems: [p1, p2]
              });
              lessonPromises.push( lesson.validate() )
            }
            Promise.all(lessonPromises)
            .then(function() { 
              done();
            })
            .catch(done);
          });

        });

        describe('problems', function() {

          it('must be an array of Problem instances', function(done) {
            var goodLesson = new Lesson({
                title: 'Lesson 1',
                description: 'Get started',
                problems: [p1, p2]
            });

            var badLesson = new Lesson({
              title: 'Lesson 2',
              description: 'no problems',
              problems: ['p1', 'p2']
            });

            goodLesson.validate()
            .then(function() {
              return badLesson.validate();
            }, function(err) {
              done(err);
            })
            .then(function() {
              var err = new Error('Lesson validated with problem list that contained non-problem objects');
              done(err);
            }, function(err) {
              expect(err).to.exist;
              done();
            })
            .catch(done);

          });

        })

    });

    xdescribe('virtuals', function() {
    });

    xdescribe('methods', function() {
    });

});
