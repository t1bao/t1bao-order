var sailsMemoryAdapter = require('sails-memory');
var serverModels = require('t1bao-models');

var config = {
  adapters: {
    memory: sailsMemoryAdapter
  },
  connections: {
    default: {
      adapter: 'memory'
    }
  },
  defaults: {
    migrate: 'alter'
  }
};
var models;
var initialized = false;
function init(next) {
  serverModels.init(config, {
    connection: 'default'
  }, next);
}
module.exports = function (cb) {
  if (initialized) {
    return cb(models);
  }
  init(function (res) {
    initialized = true;
    models = res;
    cb(models);
  });
};
