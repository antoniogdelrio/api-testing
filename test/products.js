const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Products', () => {
    describe('/GET Products', () => {
        it('GET status 200', (done) => {
            chai.request(app)
                .get('/products')
                .end((err, res) => {
                    console.log('o erro', err);
                    expect(res).to.have.property('status', 200);
                    done();
                })
        })
        it('res.body is array', (done) => {
            chai.request(app)
                .get('/products')
                .end((err,res) => {
                    expect(res.body).is.an('array');
                    done();
                })
        })
    })

    describe('/POST Products', () => {
        it('POST status 200', (done) => {
            chai.request(app)
                .post('/products')
                .send({
                    "name": "book",
                    "price": 20.00
                })
                .end((err, res) => {
                    expect(res).have.property('status', 200);
                    done();
                })
        })
        it('res.body is object and have name and price properties', (done) => {
            chai.request(app)
                .post('/products')
                .send({
                    "name": "book",
                    "price": 20.00
                })
                .end((err, res) => {
                    expect(res.body).is.an('object').and.have.property('name');
                    expect(res.body).have.property('price');
                    done();
                })
        })
    })
})