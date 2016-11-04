'use strict';
var assert = require('assert');
var tykOrder = require('../lib');
var errors = require('./errors');
var modelServer = require('./models');
var notifier = require('./notifier');

var order;

describe('tyk-order', function () {
  before(function (done) {
    modelServer(function (models) {
      assert(models);
      order = tykOrder(models, notifier, errors);
      done();
    });
  });
  it('should update no order!', function (done) {
    order.update(100, 100, 'CREATED', function (error) {
      assert.deepEqual(error, errors.OrderNotFound);
      done();
    });
  });
  it('should update user no order!', function (done) {
    order.userUpdate(100, 100, 'CREATED', function (error) {
      assert.deepEqual(error, errors.OrderNotFound);
      done();
    });
  });
});
