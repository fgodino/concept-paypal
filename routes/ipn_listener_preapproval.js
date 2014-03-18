var store = require('../store');
var payments = require('../payments')

exports.ipn_listener_preapproval = function (key){
	var purchase = store.getPurchase(key);

  payments.pay(purchase.itemId, function(){}, key);
}
