module.exports = function (models, next) {
  var returns = {};
  var store = models.Store.create({
    name: 'store'
  });
  var user = models.User.create({
    username: 'user',
    password: 'password',
    email: 'sdfsfd@dsfsf.com',
    phone: '15833443238'
  });
  var user1 = models.User.create({
    username: 'user1',
    password: 'password',
    email: 'sdfsfd11@dsfsf.com',
    phone: '13581725443'
  });
  var merchant = models.Merchant.create({
    username: 'merchant',
    password: 'sdofsof',
    email: 'sdfsfd@dsfsf.com',
    phone: '13581725443'
  });
  Promise.all([store, user, user1, merchant]).then(function (m) {
    returns.store = m[0];
    returns.user = m[1];
    returns.user1 = m[2];
    var order = models.Order.create({
      store: m[0],
      user: m[1],
      no: 'sdfsf'
    });
    var order1 = models.Order.create({
      store: m[0],
      user: m[2],
      no: 'sdfsf2323',
      state: 'CREATED',
      delivery: 'self',
      payment: 'onsite'
    });
    var order2 = models.Order.create({
      store: m[0],
      user: m[2],
      no: 'sdfsf23223',
      state: 'CREATED'
    });
    var merchantStore = models.MerchantStore.create({
      merchant: m[3],
      store: m[0]
    });
    Promise.all([order, order1, order2, merchantStore]).then(function (j) {
      returns.order = j[0];
      returns.order1 = j[1];
      returns.order2 = j[2];
      next(returns);
    });
  }).catch(function (error) {
    console.error(error);
  });
};
