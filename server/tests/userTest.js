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

});

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
});
// // signIn
// describe('User Login ', () => {
//   beforeEach('Create a user', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signup')
//       .send(mockData.signup_user2)
//       .end((error) => {
//         if (error) done(error);
//         done();
//       });
//   });
//   it('it should login a user', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send(mockData.signin_complete)
//       .end((_err, res) => {
//         res.should.have.status(200);
//         res.body.should.have.property('status').eql(200);
//         res.body.should.have.property('data');
//         res.body.data.should.have.property('token');
//         done();
//       });
//   });
//   it('it should not login user without email', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send(mockData.signin_without_email)
//       .end((_err, res) => {
//         res.should.have.status(400);
//         res.body.should.have.property('status').eql(400);
//         res.body.should.have.property('data');
//         done();
//       });
//   });
//   it('it should not login user without password', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send(mockData.signin_without_password)
//       .end((_err, res) => {
//         res.should.have.status(400);
//         res.body.should.have.property('status').eql(400);
//         res.body.should.have.property('data');
//         done();
//       });
//   });

//   // incorrect password
//   it('it should not login user with wrong password', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send(mockData.signin_with_wrong_password)
//       .end((_err, res) => {
//         res.should.have.status(401);
//         res.body.should.have.property('status').eql(401);
//         res.body.should.have.property('data');
//         done();
//       });
//   });


//   // user not found
//   it('it should not login user who does not have acount', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send(mockData.signin_with_no_account)
//       .end((_err, res) => {
//         res.should.have.status(404);
//         res.body.should.have.property('status').eql(404);
//         res.body.should.have.property('data');
//         done();
//       });
//   });
// });
