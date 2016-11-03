var states = ['CREATED', 'PAID', 'ACCEPTED', 'DELIVERED', 'UNREACHABLE', 'RECEIVED', 'COMMENTED', 'FINISHED', 'CANCELLED'];

module.exports = {
  states: states,
  changeable: function (from, to, delivery, payment) {
    var switchPairs = {
      CREATED: ['PAID', 'CANCELLED'],
      PAID: ['ACCEPTED', 'CANCELLED'],
      ACCEPTED: ['RECEIVED', 'CANCELLED'],
      DELIVERED: ['UNREACHABLE', 'RECEIVED', 'CANCELLED'],
      RECEIVED: ['COMMENTED', 'FINISHED'],
      COMMENTED: ['FINISHED']
    };
    if (delivery === 'self') {
      switchPairs.ACCEPTED = ['RECEIVED', 'CANCELLED'];
    } else {
      switchPairs.ACCEPTED = ['DELIVERED', 'CANCELLED'];
    }
    if (payment === 'onsite') {
      switchPairs.CREATED = ['ACCEPTED', 'CANCELLED'];
    }

    if (!switchPairs[from] || switchPairs[from].indexOf(to) === -1) {
      return false;
    }
    return true;
  }
};
