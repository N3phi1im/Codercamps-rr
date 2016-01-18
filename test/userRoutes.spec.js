"use strict";
let app = require('../server');
let request = require('supertest');
let should = require('should');

describe('-- User Routes --', () => {
  describe('POST /register', () => {
    it('should return a 500 if no object is sent', (done) => {
      request(app)
        .post('/users/register')
        .expect(500)
        .end(done);
    });
    it('should return a 200 if a user is sent', (done) => {
      let u = {
        username: 'username',
        email: 'user@email.com',
        password: 'secret'
      };
      request(app)
        .post('/users/register')
        .send(u)
        .expect(200)
        .end(done);
    });
    it('should return a 500 if a user tries to register with an existing username', (done) => {
      let u = {
        username: 'username',
        email: 'anotherUser@email.com',
        password: 'secret'
      };
      request(app)
        .post('/users/register')
        .send(u)
        .expect(500)
        .end(done);
    });
    it('should return a 500 if a user tries to register with an existing email', (done) => {
      let u = {
        username: 'anotherUsername',
        email: 'user@email.com',
        password: 'secret'
      };
      request(app)
        .post('/users/register')
        .send(u)
        .expect(500)
        .end(done);
    });
  });
  // end of POST /register
  describe('POST /login', () => {
    it('should return a 400 if the user does not exist', (done) => {
      let u = {
        username: 'haha',
        password: 'nope'
      };
      request(app)
        .post('/users/login')
        .send(u)
        .expect(400)
        .end(done);
    });
    it('should return a 400 if the passwords do not match', (done) => {
      let u = {
        username: 'username',
        password: 'nope'
      };
      request(app)
        .post('/users/login')
        .send(u)
        .expect(400)
        .end(done);
    });
    it('should return 200 and a token if the user is correct', (done) => {
      let u = {
        username: 'username',
        password: 'secret'
      };
      request(app)
        .post('/users/login')
        .send(u)
        .expect(200)
        .expect((res) => {
          should.exist(res.body.token);
        })
        .end(done);
    });
  });
  // end of POST /login
});
