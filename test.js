const assert = require('assert');
const request = require('supertest');
const app = require('./app');

describe('Item API', () => {
  let itemId;

  it('should create a new item', (done) => {
    request(app)
      .post('/items')
      .send({
        name: 'Test Item',
        description: 'This is a test item',
        price: 10.99,
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        itemId = res.text.split(' ')[4];
        done();
      });
  });

  it('should get all items', (done) => {
    request(app)
      .get('/items')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.length > 0);
        done();
      });
  });

  it('should get a single item', (done) => {
    request(app)
      .get(`/items/${itemId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.name === 'Test Item');
        done();
      });
  });

  it('should update an existing item', (done) => {
    request(app)
      .put(`/items/${itemId}`)
      .send({
        name: 'Updated Test Item',
        description: 'This is an updated test item',
        price: 15.99,
      })
      .expect(200)
      .end(done);
  });

  it('should delete an existing item', (done) => {
    request(app)
      .delete(`/items/${itemId}`)
      .expect(200)
      .end(done);
  });

  it('should search for items by name', (done) => {
    request(app)
      .get('/search?q=test')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.length === 0);
        done();
      });
  });
});
