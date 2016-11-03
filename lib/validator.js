// var validator = require('validator');

// /**
//  * 检测订单json串是不是合法
//  * @param merchandises
//  * @returns {boolean}
//  */
// function isOrderList(merchandises) {
//   if (merchandises.length <= 0) {
//     return false;
//   }
//   for (var i = 0; i < merchandises.length; i++) {
//     var merchandise = merchandises[i];
//     if (typeof merchandise.id !== 'number' && !validator.isInt(String(merchandise.id))) {
//       console.error('merchandise id is not valid');
//       return false;
//     }
//     if (merchandise.price && typeof merchandise.price !== 'number' && !validator.isFloat(String(merchandise.price))) {
//       console.error('merchandise price is not valid');
//       return false;
//     }
//     if (typeof merchandise.number !== 'number' && !validator.isInt(String(merchandise.number))) {
//       console.error('merchandise number is not valid');
//       return false;
//     }
//   }
//   return true;
// }

// /**
//  * Check if the store id is a existing store id
//  *
//  * @param json
//  * @param next
//  * @returns {*}
//  */
// function isStore(json, next) {
//   Store.findOne({
//     id: json.store
//   }).populate("logo").exec(function (error, store) {
//     if (error) {
//       throw error;
//     }
//     if (!store) {
//       throw new Error("商户未找到!");
//     }
//     return next(false, store);
//   });
// }

// /**
//  * Check if merchandises are of the store and exist in the database
//  * @param json
//  * @param next
//  */

// function isMerchandises(json, next) {
//   var ids = [];
//   for (var i = 0; i < json.merchandises.length; i++) {
//     var merchandise = json.merchandises[i];
//     ids.push(merchandise.id);
//   }
//   StoreMerchandise.find({
//     store: json.store,
//     merchandise: ids
//   }, function (error, sms) {
//     if (error) {
//       return next(true, error);
//     }
//     if (!sms) {
//       throw new Error("所有商品都不存在");
//     }
//     if (sms.length !== json.merchandises.length) {
//       throw new Error("部分商品不存在");
//     }
//     next(false, sms);
//   });
// }

// module.exports = function (json, next) {
//   if (typeof json.total !== 'number' && !validator.isInt(String(json.total))) {
//     throw new Error("total不是整数!");
//   }

//   if (typeof json.summary !== 'number' && !validator.isFloat(String(json.summary))) {
//     throw new Error("summary应该是数字!");
//   }

//   if (typeof json.store !== 'number' && !validator.isInt(String(json.store), {
//     min: 1
//   })) {
//     throw new Error("商户ID不是整数!");
//   }

//   if (!isOrderList(json.merchandises)) {
//     throw new Error("订单商品信息不正确!");
//   }

//   isStore(json, function (error, store) {
//     if (error) {
//       return next(true, store);
//     }
//     isMerchandises(json, function (error, data) {
//       if (error) {
//         next(error, data);
//       } else {
//         next(false, store);
//       }
//     });
//   });
// };
