module.exports = function (message, data) {
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
};
