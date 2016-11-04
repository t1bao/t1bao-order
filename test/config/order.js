module.exports = function (models, next) {
  var returns = {};
  var store = models.Store.create({
    name: 'store'
  });
  var user = models.User.create({
    username: 'user',
    password: 'password'
  });
  var merchant = models.Merchant.create({
    username: 'merchant',
    password: 'sdofsof'
  });
  Promise.all([store, user, merchant]).then(function (m) {
    returns.store = m[0];
    returns.user = m[1];
    var order = models.Order.create({
      store: m[0],
      user: m[1],
      no: 'sdfsf',
      state: 'CREATED'
    });
    var order1 = models.Order.create({
      store: m[0],
      user: m[1],
      no: 'sdfsf2323',
      state: 'CREATED',
      delivery: 'self',
      payment: 'onsite'
    });
    var merchantStore = models.MerchantStore.create({
      merchant: m[2],
      store: m[0]
    });
    Promise.all([order, order1, merchantStore]).then(function (j) {
      returns.order = j[0];
      returns.order1 = j[1];
      next(returns);
    });
  }).catch(function (error) {
    console.error(error);
  });
};
