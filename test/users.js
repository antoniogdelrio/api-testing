const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const mongoose = require('mongoose');
const User = require('../api/models/user');

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
        it('send empty object return error', (done) => {
            chai.request(app)
                .post('/users')
                .send({})
                .end((err, res) => {
                    expect(res).have.property('status', 404);
                    expect(res.body).is.an('object');
                    expect(res.body).have.property('error');
                    expect(res.body.error).have.property('message')
                    done();
                })
        })
        it('send object without valid parameters return error', (done) => {
            chai.request(app)
                .post('/users')
                .send({
                    "invalidParameter": "value"
                })
                .end((err, res) => {
                    expect(res).have.property('status', 404);
                    expect(res.body).is.an('object');
                    expect(res.body).have.property('error');
                    expect(res.body.error).have.property('message')
                    done();
                })
        })
    })

    describe('/GET/:id User', ()=>{
        it('Status 200 get a product by given id', (done) => {
            const user = new User({
                "userName": "João da Silva",
                "_id": mongoose.Types.ObjectId()
            })
            user.save((err, user) => {
                chai.request(app)
                    .get('/users/' + user._id)
                    .end((err, res) => {
                        expect(res).have.property('status', 200);
                        done();
                    })
            })
        })
        it('req.body is an array length 1', (done) => {
            const user = new User({
                "userName": "Maria de Oliveira",
                "_id": mongoose.Types.ObjectId()
            })
            user.save((err, user) => {
                chai.request(app)
                    .get('/users/' + user._id)
                    .end((err, res) => {
                        expect(res.body).is.an('array');
                        expect(res.body.length).to.equal(1);
                        done();
                    })
            })
        })
        it('invalid id return error', (done) => {
            chai.request(app)
                .get('/users/' + 'invalidID')
                .end((err, res) => {
                    expect(res.body).is.an('object');
                    expect(res.body).have.property('error');
                    done();
                })
        })
    })
})