import chai from 'chai';
import chaiHttp from 'chai-http';
import env from 'dotenv';
import app from '../app';
import entryMock from './db-entry-mockdata';
import db from '../V2/database/dbConfig';

chai.use(chaiHttp);
chai.should();
env.config();

process.env.NODE_ENV = 'test';
let userToken;
let entryId;
let userNoEntry;
const wrongTokne = entryMock.wrong_token;
describe('V2 Entry tests ', () => {
  before(() => {
    const deleteUserTestTables = `
    DELETE FROM users 
    `;
    db.pool.query(deleteUserTestTables);
    const deleteEntriesTestTables = `
    DELETE FROM entries 
    `;
    db.pool.query(deleteEntriesTestTables);
  });

  it('it should sign up a user first', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(entryMock.signup_user2)
      .end((_err, res) => {
        userToken = res.body.data.token;
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('it should sign up a user who will no create an entry', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(entryMock.signup_user_No_entry)
      .end((_err, res) => {
        userNoEntry = res.body.data.token;
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('should return entry created sucessfully ', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('token', userToken)
      .send(entryMock.user_2_create_entry1)
      .end((err, res) => {
        entryId = res.body.data.entryid;
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('Entry successfully created');
        res.body.should.have.property('data');
        res.body.data.should.have.property('title').eql('This is a second entry');
        res.body.data.should.have.property('description').eql('new entry new entry new entry new entry');
        res.body.data.should.have.property('entryid');
        res.body.data.should.have.property('createdon');
        done();
      });
  });
  it('should return title already exist ', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('token', userToken)
      .send(entryMock.user_2_create_entry1)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('Title already exist');
        done();
      });
  });
  it('should return no Invalid token ', (done) => {
    chai.request(app)
      .post('/api/v2/entries/')
      .set('token', wrongTokne)
      .send(entryMock.user_2_create_entry)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Invalid token');
        done();
      });
  });
  it('should return no token provided ', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('token', '')
      .send(entryMock.user_2_create_entry)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('No token provided');
        done();
      });
  });
  it('should return not create an entry without title', (done) => {
    chai.request(app)
      .post('/api/v2/entries')
      .set('token', userToken)
      .send(entryMock.entry_no_title)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return all entries created ', (done) => {
    chai.request(app)
      .get('/api/v2/entries')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('All Entries');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return no entry found, create an entry first ', (done) => {
    chai.request(app)
      .get('/api/v2/entries')
      .set('token', userNoEntry)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Create an entry first, no entry found at the moment');
        done();
      });
  });
  it('should return specific entry ', (done) => {
    chai.request(app)
      .get(`/api/v2/entries/${entryId}`)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Specific entry');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return enter valid entry Id ', (done) => {
    chai.request(app)
      .get('/api/v2/entries/tuyiuopiuyt')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('Please enter a  valid entry Id');
        done();
      });
  });
  it('should return entry not found ', (done) => {
    chai.request(app)
      .get(`/api/v2/entries/${9409}`)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('No Entry Found');
        done();
      });
  });
  it('should return entry was not found ', (done) => {
    chai.request(app)
      .delete(`/api/v2/entries/${6754}`)
      .set('token', userNoEntry)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('No Entry Found');
        done();
      });
  });
  it('should return entry was edited sucessfullly ', (done) => {
    chai.request(app)
      .patch(`/api/v2/entries/${entryId}`)
      .set('token', userToken)
      .send(entryMock.modifyEntry)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Entry successfully edited');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return entry was not found ', (done) => {
    chai.request(app)
      .patch(`/api/v2/entries/${6344}`)
      .send(entryMock.modifyEntry)
      .set('token', userNoEntry)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('No Entry Found');
        done();
      });
  });
  it('should return entry was deleted sucessfullly ', (done) => {
    chai.request(app)
      .delete(`/api/v2/entries/${entryId}`)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('Entry successfully deleted');
        done();
      });
  });
});
