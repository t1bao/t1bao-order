module.exports = function (message, state, data) {
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
};
