const User = require('../api/models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('should');
const app = require('../api/app');

chai.use(chaiHttp);

describe('Users', ()=>{

    describe('/GET Users', ()=>{
        it('Testando GET todos os Users', (done)=>{
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.property('status', 200);
                done();
                })
        })
    })
})