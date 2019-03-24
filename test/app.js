
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../app');


describe("GET /users", () => {

  it('Should return status code 200 and json', (done) => {
    chai.request(app)
      .get('/api/v0.1/users')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res).to.have.header('content-type', 'application/json; charset=utf-8')
        chai.expect(res).to.be.a('object')
        //console.log(res.body)
        done()
      })
  });
})

describe("GET /users with limit", () => {

  it('Should return status code 200, json and limited array with 5 elements', (done) => {
    chai.request(app)
      .get('/api/v0.1/users')
      .query({ limit: 5 })
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res).to.have.header('content-type', 'application/json; charset=utf-8')
        chai.expect(res).to.be.a('object')
        chai.assert.lengthOf(res.body.users, 5, 'Users have length of 5')
        done()
      })
  });
})