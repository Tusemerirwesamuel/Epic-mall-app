/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
// eslint-disable-next-line no-unused-vars
const { expect } = chai.expect;
chai.use(chaiHttp);
describe('user signup', () => {
  it(' new user should be created', () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .end((err, res) => {
        chai.expect(res.body).be.a('object');
      });
  });
});
describe('user login', () => {
  it('user should login', () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .end((err, res) => {
        chai.expect(res.body).to.be.a('object');
      });
  });
});
