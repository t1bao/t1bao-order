'use strict';
var assert = require('assert');
var tykOrder = require('../lib');
var errors = require('./config/errors');
var modelServer = require('./config/models');
var notifier = require('./config/notifier');

var order;

describe('tyk-order # no order', function () {
  before(function (done) {
    modelServer(function (models) {
      assert(models);
      order = tykOrder(models, notifier, errors);
      done();
    });
  });
  it('should update no order!', function (done) {
    order.update(1000, 1000, 'CREATED', function (error) {
      assert.deepEqual(error, errors.OrderNotFound);
      done();
    });
  });
  it('should update user no order!', function (done) {
    order.userUpdate(1000, 1000, 'CREATED', function (error) {
      assert.deepEqual(error, errors.OrderNotFound);
      done();
    });
  });
});
