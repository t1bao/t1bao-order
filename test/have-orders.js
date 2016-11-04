'use strict';
var assert = require('assert');
var tykOrder = require('../lib');
var errors = require('./config/errors');
var modelServer = require('./config/models');
var notifier = require('./config/notifier');
var orderService = require('./config/order');

var order;

describe('tyk-order # have orders', function () {
  before(function (done) {
    modelServer(function (models) {
      assert(models);
      order = tykOrder(models, notifier, errors);
      orderService(models, function (order) {
        assert(order);
        done();
      });
    });
  });
  it('should update no order!', function (done) {
    order.update(1, 1, 'CREATED', function (error) {
      assert.deepEqual(error, errors.OrderStateTransferNotAllowed);
      done();
    });
  });
  it('should update user no order!', function (done) {
    order.userUpdate(1, 1, 'CREATED', function (error) {
      assert.deepEqual(error, errors.OrderStateTransferNotAllowed);
      done();
    });
  });
  it('should update order paid!', function (done) {
    order.update(1, 1, 'ACCEPTED', function (error) {
      assert.deepEqual(error, errors.Success);
      done();
    });
  });
});
