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
      });
    done();
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
      });
    done();
  });
  it('it should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.signin_complete)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('it should not login a user with wrong password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.signin_with_wrong_password)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Invalid email or password');
        done();
      });
  });
});

// signIn

describe(' Login test', () => {
  it('it should sign up a 2nd user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.signup_user3)
      .end((_err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
      });
    done();
  });
  it('it should not login a user with no email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.signin_without_email)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
  it('it should not login a user no password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.signin_without_password)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});
