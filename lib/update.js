function update(models, errors, message) {
  var stateLib = require('./state');
  var notification = require('./notification')(models, errors, message);
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
    Order.findOne(options).populate('store').then(function (order) {
      if (!(order && order.store)) {
        console.error(errors.OrderNotFound.restify());
        next(errors.OrderNotFound);
        return;
      }
      if (!stateLib.changeable(order.state, state, order.delivery, order.payment)) {
        next(errors.OrderStateTransferNotAllowed);
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
        }).then(function (orders) {
          notification.send(order, options).then(function () {
            next(errors.Success, orders[0]);
          }).catch(update._onError(errors.UnknownError, next));
        }).fail(update._onError(errors.DatabaseError, next));
    }).fail(update._onError(errors.DatabaseError, next));
  };
}

update._onError = function (error, next) {
  return function (e) {
    console.error(e.stack);
    next(error, e);
  };
};
module.exports = update;

