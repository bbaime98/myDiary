import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();


// Signing up
describe('Signup Test', () => {
  it('it should sign up a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.signup_user2)
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
      .post('/api/v1/auth/signup')
      .send(mockData.signup_no_firstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
  it('it should not sign up a user without email ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.signup_no_email)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });

  it('it should not sign up a user without password ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.signup_no_password)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
  it('it should not sign up a user without first name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.signup_no_firstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
  it('it should not sign up a user without last name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.signup_no_lastName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
  it('it should not sign up an already existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.signup_email_exist)
      .end((_err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error').eql('Email already exists');
        done();
      });
  });
});
