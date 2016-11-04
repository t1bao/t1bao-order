function update(models, errors, notifier) {
  var stateLib = require('./state');
  var notification = require('./notification')(models, errors, notifier);
  return function (options, state, next) {
    var Order = models.Order;
    // records event change logs
    function events(order, state, note) {
      order.events = order.events || [];
      order.events.push({
        when: new Date(),
        state: state,
        note: note || ''
      });
    }
    Order.findOne(options).populate('store').exec(function (error, order) {
      if (error) {
        console.error(error);
        next(errors.DatabaseError, error);
        return;
      }
      if (!order) {
        console.error(errors.OrderNotFound.restify());
        next(errors.OrderNotFound, error);
        return;
      }
      if (!stateLib.changeable(order.state, state, order.delivery, order.payment)) {
        next(errors.OrderStateTransferNotAllowed, error);
        return;
      }
      events(order, state); // Add events info
      order.state = state;
      Order.update({
        id: options.id
      },
        {
          state: state,
          events: order.events
        }).exec(function (error, orders) {
          if (error) {
            console.error(error);
            return next(errors.DatabaseError, error);
          }
          if (!orders || orders.length < 1) {
            next(errors.OrderNotUpdated, error);
            return;
          }
          notification.send(options.store, order, options).then(function () {
            next(errors.Success, orders[0]);
          }).catch(function (e) {
            console.error(e.stack);
            next(errors.UnknownError, e);
          });
        });
    });
  };
}

module.exports = update;
