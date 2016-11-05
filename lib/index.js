'use strict';
module.exports = function (models, message, errors) {
  var update = require('./update')(models, errors, message);
  return {
    userUpdate: function (id, user, state, next) {
      update({
        id: id,
        user: user
      }, state, next);
    },
    update: function (id, store, state, next) {
      update({
        id: id,
        store: store
      }, state, next);
    }
  };
};
