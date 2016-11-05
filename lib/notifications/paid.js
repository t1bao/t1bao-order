module.exports = function (message, state, data) {
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
};
