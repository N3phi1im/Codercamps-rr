"use strict";
let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../server');
let Book = mongoose.model('Book');

describe('-- Book Routes --', () => {
  let id;
  before((done) => {
    let book = new Book();
    book.title = "Sample Title";
    book.author = "Sample Author";
    book.publish = 111;
    book.genre = 'Sample Genre';
    book.save((err) => {
      id = book._id.toString();
      done();
    });
  });

  describe('GET /books', () => {
    it('Should return a status of 200', (done) => {
      request(app)
        .get('/books')
        // checking the status code
        .expect(200)
        .end(done);
    });
    it('Should return an array with 1 book in it', (done) => {
      request(app)
        .get('/books')
        .expect(200)
        .expect((res) => {
          should.exist(res.body);
          res.body.length.should.equal(1);
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
  // end of POST /books
  describe('UPDATE /books', () => {
    it('Should return a 200 with no body', (done) => {
      request(app)
        .put('/books/' + id)
        .expect(200)
        .end(done);
    });
    it('Should return a 404 with no id', (done) => {
      var b = {
        title: 'update title',
        publish: 555
      };
      request(app)
        .put('/books')
        .send(b)
        .expect(404)
        .end(done);
    });
    it('Should return 200 with a body', (done) => {
      var b = {
        title: 'update title',
        publish: 555
      };
      request(app)
        .put('/books/' + id)
        .send(b)
        .expect(200)
        .expect((res) => {
          res.body.title.should.equal('update title');
          res.body.author.should.equal('Sample Author');
        })
        .end(done);
    });
  });
});
