'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Sale = mongoose.model('Sale');

var credentials,
    token,
    mockup;

describe('Sale CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            orderno: 'orderno01',
            orderdate: '12/05/2020',
            customerno: 'customer01',
            customername: 'customername01',
            precredit: 30,
            items: [
                {
                    sku: 'sku01',
                    name: 'iphone 11',
                    description: 'iphone11 32GB',
                    priceuntax: 23000,
                    pricetax: 24000,
                    quantity: 1,
                    taxrate: 7,
                    tax: 1000,
                    subtotal: 24000
                }
            ],
            untaxamount: 23000,
            taxamount: 24000,
            discountamount: 0,
            totalamount: 24000
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Sale get use token', (done)=>{
        request(app)
        .get('/api/sales')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be Sale get by id', function (done) {

        request(app)
            .post('/api/sales')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/sales/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.orderno, mockup.orderno);
                        assert.equal(resp.data.orderdate, mockup.orderdate);
                        assert.equal(resp.data.customerno, mockup.customerno);
                        assert.equal(resp.data.customername, mockup.customername);
                        assert.equal(resp.data.precredit, mockup.precredit);

                        assert.equal(resp.data.items[0].sku, mockup.items[0].sku);
                        assert.equal(resp.data.items[0].name, mockup.items[0].name);
                        assert.equal(resp.data.items[0].description, mockup.items[0].description);
                        assert.equal(resp.data.items[0].priceuntax, mockup.items[0].priceuntax);
                        assert.equal(resp.data.items[0].pricetax, mockup.items[0].pricetax);
                        assert.equal(resp.data.items[0].quantity, mockup.items[0].quantity);
                        assert.equal(resp.data.items[0].taxrate, mockup.items[0].taxrate);
                        assert.equal(resp.data.items[0].tax, mockup.items[0].tax);
                        assert.equal(resp.data.items[0].subtotal, mockup.items[0].subtotal);

                        assert.equal(resp.data.untaxamount, mockup.untaxamount);
                        assert.equal(resp.data.taxamount, mockup.taxamount);
                        assert.equal(resp.data.discountamount, mockup.discountamount);
                        assert.equal(resp.data.totalamount, mockup.totalamount);
                        done();
                    });
            });

    });

    it('should be Sale post use token', (done)=>{
        request(app)
            .post('/api/sales')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.orderno, mockup.orderno);
                        assert.equal(resp.data.orderdate, mockup.orderdate);
                        assert.equal(resp.data.customerno, mockup.customerno);
                        assert.equal(resp.data.customername, mockup.customername);
                        assert.equal(resp.data.precredit, mockup.precredit);

                        assert.equal(resp.data.items[0].sku, mockup.items[0].sku);
                        assert.equal(resp.data.items[0].name, mockup.items[0].name);
                        assert.equal(resp.data.items[0].description, mockup.items[0].description);
                        assert.equal(resp.data.items[0].priceuntax, mockup.items[0].priceuntax);
                        assert.equal(resp.data.items[0].pricetax, mockup.items[0].pricetax);
                        assert.equal(resp.data.items[0].quantity, mockup.items[0].quantity);
                        assert.equal(resp.data.items[0].taxrate, mockup.items[0].taxrate);
                        assert.equal(resp.data.items[0].tax, mockup.items[0].tax);
                        assert.equal(resp.data.items[0].subtotal, mockup.items[0].subtotal);

                        assert.equal(resp.data.untaxamount, mockup.untaxamount);
                        assert.equal(resp.data.taxamount, mockup.taxamount);
                        assert.equal(resp.data.discountamount, mockup.discountamount);
                        assert.equal(resp.data.totalamount, mockup.totalamount);
                done();
            });
    });

    it('should be sale put use token', function (done) {

        request(app)
            .post('/api/sales')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    orderno: 'orderno02',
                    orderdate: '13/06/2021',
                    customerno: 'customer02',
                    customername: 'customername02',
                    precredit: 30,
                    items: [
                        {
                            sku: 'sku02',
                            name: 'iphone 12',
                            description: 'iphone12 64GB',
                            priceuntax: 25000,
                            pricetax: 26000,
                            quantity: 1,
                            taxrate: 7,
                            tax: 1000,
                            subtotal: 26000
                        }
                    ],
                    untaxamount: 25000,
                    taxamount: 26000,
                    discountamount: 3000,
                    totalamount: 23000
                }
                request(app)
                    .put('/api/sales/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.orderno, update.orderno);
                        assert.equal(resp.data.orderdate, update.orderdate);
                        assert.equal(resp.data.customerno, update.customerno);
                        assert.equal(resp.data.customername, update.customername);
                        assert.equal(resp.data.precredit, update.precredit);

                        assert.equal(resp.data.items[0].sku, update.items[0].sku);
                        assert.equal(resp.data.items[0].name, update.items[0].name);
                        assert.equal(resp.data.items[0].description, update.items[0].description);
                        assert.equal(resp.data.items[0].priceuntax, update.items[0].priceuntax);
                        assert.equal(resp.data.items[0].pricetax, update.items[0].pricetax);
                        assert.equal(resp.data.items[0].quantity, update.items[0].quantity);
                        assert.equal(resp.data.items[0].taxrate, update.items[0].taxrate);
                        assert.equal(resp.data.items[0].tax, update.items[0].tax);
                        assert.equal(resp.data.items[0].subtotal, update.items[0].subtotal);

                        assert.equal(resp.data.untaxamount, update.untaxamount);
                        assert.equal(resp.data.taxamount, update.taxamount);
                        assert.equal(resp.data.discountamount, update.discountamount);
                        assert.equal(resp.data.totalamount, update.totalamount);
                        done();
                    });
            });

    });

    it('should be sale delete use token', function (done) {

        request(app)
            .post('/api/sales')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/sales/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be sale get not use token', (done)=>{
        request(app)
        .get('/api/sales')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be sale post not use token', function (done) {

        request(app)
            .post('/api/sales')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be sale put not use token', function (done) {

        request(app)
            .post('/api/sales')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/sales/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be sale delete not use token', function (done) {

        request(app)
            .post('/api/sales')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/sales/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Sale.deleteMany().exec(done);
    });

});