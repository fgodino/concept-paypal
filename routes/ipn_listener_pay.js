var store = require('./store.js');

exports.ipn_listener_pay = function(req, res) {
	var key = req.body.payKey;

	var purchase = store.getPurchase(key);

	purchase.doPay();
}