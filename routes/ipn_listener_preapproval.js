var store = require('../store');
var payments = require('../payments')

module.export = function (key){
	purchase = store.getPurchase(key);

  payments.pay(purchase.itemId, function(){}, key);
}
