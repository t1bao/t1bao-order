'use strict';
var assert = require('assert');
var notification = require('../lib/notification');

describe('tyk-order # notifications', function () {
  it('should notification on error', function () {
    var e = {
      stack: 'hello'
    };
    assert(!notification._onError(e));
  });
});
