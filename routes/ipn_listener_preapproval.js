var store = require('../store');

module.export = function (req, res){
	pkey = req.body.preapproval_key;
	purchase = store.getPurchase(pkey);
	purchase.doPay();
}