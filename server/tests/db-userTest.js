import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import mockData from './db-user-mockData';
import db from '../V2/database/dbConfig';


dotenv.config();
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
chai.should();


// Signing up
describe(' V2 USER TESTS', () => {
  before(() => {
    const deleteUserTestTables = `
    DELETE FROM users 
    `;
    db.pool.query(deleteUserTestTables);
  });
  after(() => {
    const deleteTables = `
    DELETE FROM users CASCADE
    `;
    db.pool.query(deleteTables);
  });

  it('it should sign up a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(mockData.signup_user1)
      .end((_err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('it should not create an user account with incomplete info', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(mockData.signup_no_firstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
  it('it should not sign up a user without email ', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(mockData.signup_no_email)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('it should not sign up a user who already exist', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(mockData.signup_user1)
      .end((_err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error');
        done();
      });
  });
  // signIn
  it('it should login a user ', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(mockData.login_user_1)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('User is successfully logged in');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('it should not login a user with invalid email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(mockData.login_user_wrong_email)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Invalid email or password');
        done();
      });
  });
  it('it should not login a user with no email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(mockData.login_user_no_password)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
