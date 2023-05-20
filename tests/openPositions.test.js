const app = require('../app');
const supertest = require('supertest');
const { expect } = require('chai');
const config = require('./helper/config');

describe('Actian Careers API Integration Tests', async () => {
    it('should get open positions by the department name ', (done) => {
        supertest(app).get(`/api/open-positions?department=${config.department}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).not.to.be.empty;
                done();
            });
    });

    it('should give error / department name is wrong', (done) => {
        supertest(app).get(`/api/open-positions?department=${config.department}-wrong`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('should give error / no department name is passing', (done) => {
        supertest(app).get(`/api/open-positions?department=`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('should give error / api end-point is wrong', (done) => {
        supertest(app).get(`/v2/api/open-positions?department=${config.department}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

});
