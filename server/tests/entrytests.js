import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import entryMock from './entryMockdata';

chai.use(chaiHttp);
chai.should();

let userToken;
describe('Entry tests ', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(entryMock[0])
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('should return entry created sucessfully ', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('token', userToken)
      .send(entryMock[1])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('Entry successfully created');
        res.body.should.have.property('data');
        res.body.data.should.have.property('title').eql('This is a good title');
        res.body.data.should.have.property('description').eql('everything will be alright');
        res.body.data.should.have.property('entryID');
        res.body.data.should.have.property('createdOn');
        done();
      });
  });
  it('should return all entries created ', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('token', userToken)
      .send(entryMock[1])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('All Entries');
        res.body.should.have.property('data');
      });
    done();
  });
  it('should return User is successfully logged in ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('token', userToken)
      .send(entryMock[2])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('User is successfully logged in');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return specific entry ', (done) => {
    chai.request(app)
      .get('/api/v1/entries/1')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Specific Entry');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return no entry found ', (done) => {
    chai.request(app)
      .get('/api/v1/entries/90090')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('No Entry found');
        done();
      });
  });
});
