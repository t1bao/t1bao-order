// var notifier = require('./messaging/notifier');
var assert = require('assert');

function notification(models, errors, notifier) {
  var message = require('./message')(notifier);

  var returnObject = {
    _onAccepted: function (state, data) {
      if (data.customer.email) {
        message({
          event: 'order/' + state,
          type: 'email',
          receiver: data.customer.email,
          data: data.data
        });
      }
      if (data.customer.phone) {
        message({
          event: 'order/' + state,
          type: 'sms',
          receiver: data.customer.phone,
          data: data.data
        });
      }
    },
    _onCancelled: function (data) {
      if (data.fromCustomer) {
        if (data.merchant.email) {
          message({
            event: 'order/cancelled-by-customer',
            type: 'email',
            receiver: data.merchant.email,
            data: data.data
          });
        }
        if (data.merchant.phone) {
          message({
            event: 'order/cancelled-by-customer',
            type: 'sms',
            receiver: data.merchant.phone,
            data: data.data
          });
        }
      } else {
        if (data.customer.email) {
          message({
            event: 'order/cancelled-by-merchant',
            type: 'email',
            receiver: data.customer.email,
            data: data.data
          });
        }
        if (data.customer.phone) {
          message({
            event: 'order/cancelled-by-merchant',
            type: 'sms',
            receiver: data.customer.phone,
            data: data.data
          });
        }
      }
    },
    _onDevliered: function (state, data) {
      if (data.customer.email) {
        message({
          event: 'order/' + state,
          type: 'email',
          receiver: data.customer.email,
          data: data.data
        });
      }
      if (data.customer.phone) {
        message({
          event: 'order/' + state,
          type: 'sms',
          receiver: data.customer.phone,
          data: data.data
        });
      }
    },
    _onCreated: function (state, data) {
      if (data.merchant.email) {
        message({
          event: 'order/' + state,
          type: 'email',
          receiver: data.merchant.email,
          data: data.data
        });
      }
      if (data.merchant.phone) {
        message({
          event: 'order/' + state,
          type: 'sms',
          receiver: data.merchant.phone,
          data: data.data
        });
      }
    },
    _onFinisihed: function (state, data) {
      if (data.merchant.email) {
        message({
          event: 'order/' + state,
          type: 'email',
          receiver: data.merchant.email,
          data: data.data
        });
      }
      if (data.customer.email) {
        message({
          event: 'order/' + state,
          type: 'email',
          receiver: data.customer.email,
          data: data.data
        });
      }
      if (data.merchant.phone) {
        message({
          event: 'order/' + state,
          type: 'sms',
          receiver: data.merchant.phone,
          data: data.data
        });
      }
      if (data.customer.phone) {
        message({
          event: 'order/' + state,
          type: 'sms',
          receiver: data.customer.phone,
          data: data.data
        });
      }
    },
    _onPaid: function (state, data) {
      if (data.merchant.email) {
        message({
          event: 'order/' + state,
          type: 'email',
          receiver: data.merchant.email,
          data: data.data
        });
      }
      if (data.merchant.phone) {
        message({
          event: 'order/' + state,
          type: 'sms',
          receiver: data.merchant.phone,
          data: data.data
        });
      }
    },
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
        // console.log(data);
        var state = order.state.toLowerCase();
        /* eslint complexity: ["error", 30] */

        switch (state) {
          case 'accepted':
            returnObject._onAccepted(state, data);
            break;
          case 'cancelled':
            returnObject._onAccepted(data);
            break;
          case 'delivered':
            returnObject._onDevliered(state, data);
            break;
          case 'created':
            returnObject._onCreated(state, data);
            break;
          case 'finished':
            returnObject._onFinisihed(state, data);
            break;
          case 'unreachable':
          case 'received':
          case 'paid':
            returnObject._onPaid(state, data);
            break;
          default:
            break;
        }
        return Promise.resolve();
      };
    },
    send: function (store, order, options) {
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
        .catch(function (error) {
          console.error('failed to get notifier');
          console.error(error);
          console.error(error.stack);
          return false;
        });
    }
  };
  return returnObject;
}
module.exports = notification;
