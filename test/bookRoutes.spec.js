"use strict";
let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../server');
let Book = mongoose.model('Book');
let User = mongoose.model('User');

describe('-- Book Routes --', () => {
  let id;
  let authHeader;
  before((done) => {
    let u = new User();
    u.username = "bookUser";
    u.email = 'book@user.com';
    u.setPassword('secret');
    u.save((err, user) => {
      let book = new Book();
      book.title = "Sample Title";
      book.author = "Sample Author";
      book.publish = 111;
      book.genre = 'Sample Genre';
      book.createdBy = user._id;
      book.save((err) => {
        authHeader = `Bearer ${user.generateJWT()}`;
        id = book._id.toString();
        user.books.push(book._id);
        user.save();
        done();
      });
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
    it('Should return a 401 without an auth header', (done) => {
      var b = {
        title: 'title',
        author: 'author',
        publish: 123,
        genre: 'genre'
      };
      request(app)
        .post('/books')
        .send(b)
        .expect(401)
        .end(done);
    });
    it('Should return a 500 with no body', (done) => {
      request(app)
        .post('/books')
        .set('Authorization', authHeader)
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
        .set('Authorization', authHeader)
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
  // end of PUT: /books?_id=
  describe('DELETE /books?_id=', () => {
    it('Should return a 404 if there is no id', (done) => {
      request(app)
        .delete('/books')
        .expect(404)
        .end(done);
    });
    it('Should return 200 if the id exists', (done) => {
      request(app)
        .delete('/books?_id=' + id)
        .expect(200)
        .end(done);
    });
  });
});
