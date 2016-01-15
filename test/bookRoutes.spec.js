"use strict";
let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../server');
let Book = mongoose.model('Book');

describe('-- Book Routes --', () => {
  describe('GET /books', () => {
    it('Should return a status of 200', (done) => {
      request(app)
        .get('/books')
        // checking the status code
        .expect(200)
        .end(done);
    });
    it('Should return an empty array', (done) => {
      request(app)
        .get('/books')
        .expect(200)
        .expect((res) => {
          should.exist(res.body);
          res.body.length.should.equal(0);
        })
        .end(done);
    });
  });
  // end of GET /books
  describe('POST /books', () => {
    it('Should return a 400 with no body', (done) => {
      request(app)
        .post('/books')
        .expect(500)
        .end(done);
    });
    it('Should return a 200 with a body, and the object back', (done) => {
      var b = {
        title: 'title',
        author: 'author',
        publish: 123,
        genre: 'genre'
      };
      request(app)
        .post('/books')
        .send(b)
        .expect(200)
        .expect((res) => {
          should.exist(res.body);
          should.exist(res.body._id);
          res.body.title.should.equal('title');
          res.body.author.should.equal('author');
          res.body.genre.should.equal('genre');
          res.body.publish.should.equal(123);
        })
        .end(done);
    });
  });
});
