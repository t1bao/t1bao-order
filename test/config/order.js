module.exports = function (models, next) {
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
    var order = models.Order.create({
      store: m[0],
      user: m[1],
      no: 'sdfsf',
      state: 'CREATED'
    });
    var merchantStore = models.MerchantStore.create({
      merchant: m[2],
      store: m[0]
    });
    Promise.all([order, merchantStore]).then(function (j) {
      next(j[0], j[1]);
    });
  });
};
