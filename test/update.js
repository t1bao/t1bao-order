'use strict';
var assert = require('assert');
var update = require('../lib/update');

describe('tyk-order # update', function () {
  it('should update on error', function (done) {
    var error = {
      UnknownError: 1
    };
    var e = {
      stack: 'hello'
    };
    var onError = update._onError(error, function (error1, e1) {
      assert.deepEqual(error, error1);
      assert.deepEqual(e, e1);
      done();
    });
    onError(e);
  });
});
