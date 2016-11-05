'use strict';
var assert = require('assert');
var tykOrder = require('../lib');
var errors = require('./config/errors');
var modelServer = require('./config/models');
var notifier = require('./config/notifier');
var orderService = require('./config/order');

var order;
var objs;

describe('tyk-order # have orders', function () {
  before(function (done) {
    modelServer(function (models) {
      assert(models);
      order = tykOrder(models, notifier, errors);
      orderService(models, function (ret) {
        objs = ret;
        assert(objs);
        done();
      });
    });
  });
  it('should update no order!', function (done) {
    order.update(objs.order.id, objs.store.id, 'CREATED', function (error) {
      assert.deepEqual(error, errors.OrderStateTransferNotAllowed);
      done();
    });
  });
  it('should update user no order!', function (done) {
    order.userUpdate(objs.order.id, objs.store.id, 'CREATED', function (error) {
      assert.deepEqual(error, errors.OrderStateTransferNotAllowed);
      done();
    });
  });
  it('should update order paid!', function (done) {
    order.update(objs.order.id, objs.store.id, 'DEFAULT', function (error) {
      assert.deepEqual(error, errors.OrderStateTransferNotAllowed);
      done();
    });
  });
  it('should update order paid!', function (done) {
    order.update(objs.order.id, objs.store.id, 'ACCEPTED', function (error) {
      assert.deepEqual(error, errors.Success);
      done();
    });
  });
  it('should update order paid!', function (done) {
    order.update(objs.order.id, objs.store.id, 'DELIVERED', function (error) {
      assert.deepEqual(error, errors.Success);
      done();
    });
  });
  it('should update order paid!', function (done) {
    order.update(objs.order.id, objs.store.id, 'RECEIVED', function (error) {
      assert.deepEqual(error, errors.Success);
      done();
    });
  });

  it('should update order paid!', function (done) {
    order.update(objs.order.id, objs.store.id, 'COMMENTED', function (error) {
      assert.deepEqual(error, errors.Success);
      done();
    });
  });

  it('should update order paid!', function (done) {
    order.update(objs.order.id, objs.store.id, 'FINISHED', function (error) {
      assert.deepEqual(error, errors.Success);
      done();
    });
  });

  it('should update order paid!', function (done) {
    order.update(objs.order1.id, objs.store.id, 'PAID', function (error) {
      assert.deepEqual(error, errors.OrderStateTransferNotAllowed);
      done();
    });
  });
  it('should update order paid!', function (done) {
    order.update(objs.order1.id, objs.store.id, 'ACCEPTED', function (error) {
      assert.deepEqual(error, errors.Success);
      done();
    });
  });
});
