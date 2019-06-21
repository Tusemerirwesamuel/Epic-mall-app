/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';


const should = chai.should();
const { expect } = chai.expect;

chai.use(chaiHttp);
describe(' create new message', () => {
  it('new message should be created', () => {
    chai.request(app)
      .post('/api/v1/messages')
      .end((err, res) => {
        chai.expect(res.body).to.be.a('object');
      });
  });
});
describe(' get all messages', () => {
  it('list of all created message', () => {
    chai.request(app)
      .get('/api/v1/messages')
      .end((err, res) => {
        chai.expect(res.body).to.be.a('object');
      });
  });
});
describe(' get one specific message', () => {
  it('one message retrieved ', () => {
    chai.request(app)
      .get('/api/v1/messages/:id')
      .end((err, res) => {
        chai.expect(res.body).to.be.a('object');
      });
  });
});
describe('if message not found', () => {
  it('should return error', () => {
    chai.request(app)
      .get('/api/v1/messages/:id')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(204);
      });
  });
});
describe('delete message', () => {
  it('message will be deleted', () => {
    chai.request(app)
      .delete('/api/v1/messages/:id')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
      });
  });
});
describe('request params not id', () => {
  it('get error message', () => {
    chai.request(app)
      .delete('/api/v1/messages/:id')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
      });
  });
});

describe('get unread,sent and read message', () => {
  it('unread message retrieved', () => {
    chai.request(app)
      .get('/api/v1/messages/:status/messages')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
      });
  });
});
