import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

// WELCOME PAGE
describe('App tests', () => {
  it('should display a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('message')
          .eql(
            'Welcome to MyDiary'
          );
        done();
      });
  });
});

// INVALID ROUTES
describe('Handle invalid routes', () => {
  it('should display an error message', (done) => {
    chai
      .request(app)
      .get('/jjjjkord')
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('Route Not Found');
        done();
      });
  });
});
