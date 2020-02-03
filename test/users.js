const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', ()=>{
    describe('/GET Users', () => {
        it('GET status 200', (done)=>{
            chai.request(app)
                .get('/users')
                .end((err,res) => {
                    expect(res).to.have.property('status', 200);
                    done();
                })
        })
        it('res.body is array', (done)=>{
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
        })
    })

    describe('/POST Users', () => {
        it('POST status 200', (done)=>{
            chai.request(app)
                .post('/users')
                .send({
                    "userName": "João Silva"
                })
                .end((err,res) => {
                    expect(res).to.have.property('status', 200);
                    done();
                })
        })
        it('res.body is object and have userName property', (done)=>{
            chai.request(app)
                .post('/users')
                .send({
                    "userName": "João Silva"
                })
                .end((err, res) => {
                    expect(res.body).to.be.an('object').and.have.property('userName');
                    done();
                })
        })
    })
})