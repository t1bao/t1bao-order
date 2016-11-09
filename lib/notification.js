var assert = require('assert');

function notification(models, errors, message) {
  var notifications = require('./notifications');

  var returnObject = {
    _all: function (order, fromCustomer) {
      return function (m) {
        var merchant = m[0];
        var customer = m[1];
        var data = {
          merchant: merchant,
          customer: customer,
          order: order,
          store: order.store,
          fromCustomer: fromCustomer
        };
        var state = order.state.toLowerCase();
        /* eslint complexity: ["error", 30] */
        switch (state) {
          case 'accepted':
            notifications._onAccepted(message, state, data);
            break;
          case 'cancelled':
            notifications._onCancelled(message, data);
            break;
          case 'delivered':
            notifications._onDelivered(message, state, data);
            break;
          case 'created':
            notifications._onCreated(message, state, data);
            break;
          case 'finished':
            notifications._onFinisihed(message, state, data);
            break;
          case 'unreachable':
          case 'received':
          case 'paid':
          default:
            notifications._onPaid(message, state, data);
            break;
        }
        return Promise.resolve();
      };
    },
    send: function (order, options) {
      var fromCustomer = true;
      if (options && options.store) {
        fromCustomer = false;
      }
      var find = {
        store: order.store
      };
      if (order.store.id) {
        find.store = order.store.id;
      }
      var merchantP = models.MerchantStore.findOne(find).populate('merchant').then(function (us) {
        assert(us && us.merchant);
        return us.merchant;
      });
      var customerP = models.User.findOne({
        id: order.user
      }).then(function (merchant) {
        assert(merchant);
        return merchant;
      });
      return Promise.all([merchantP, customerP]).then(returnObject._all(order, fromCustomer))
        .catch(notification._onError);
    }
  };
  return returnObject;
}
notification._onError = function (error) {
  console.error('failed to get notifier');
  console.error(error);
  console.error(error.stack);
  return false;
};

module.exports = notification;
