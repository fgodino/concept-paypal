var store = require('../store');
var payments = require('../payments')

module.export = function (req, res){
	pkey = req.body.preapproval_key;
	purchase = store.getPurchase(pkey);

  payments.pay(purchase.itemId, function(){}, pkey);
}
