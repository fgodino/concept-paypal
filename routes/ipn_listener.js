
var ipn = require("../my-verify.js");
var store = require("../store");
var qs = require('qs');

var notifications = {};

exports.ipn_listener = function (req, res) {
	res.send(200);

	var parsedBody;

	ipn.verify(req.body, function (err, msg) {
		if (err){
			console.log(err, msg);
		}
		else{
			var text = decodeURIComponent(req.body);
			var patt1 = /\]\.[\w,\d]+\=/g;
			var result = text.match(patt1);
			var replaced = text;

			for(var i = 0; i < result.length; i++){
				var cad = result[i];
				var toReplace = "][" + cad.substring(2,cad.length-1) + "]=";
				var replaced = replaced.replace(cad, toReplace);
			}

			parsedBody = qs.parse(replaced);
			if(req.body.status == 'COMPLETED'){
				/* Hay que comprobar que el email pertenece a una cuenta de Paypal
				 * (receiver)
				 * Hay que comprobar que el id de la transacción no esté repetido
				 * Verificar que el artículo se corresponde con el precio indicado */
				 var notification = req.query.item;
				 addNotification(notification);
				}
			}
		});
}

exports.addNotification = function (notification) {
	notifications[notification.txn_id] = new Notification(notification);
}

exports.getNotification = function (notification) {
	return notifications[notification.txn_id];
}

exports.getNotifications = function () {
	return notifications;
}

var Notification = function(notification){
	console.log(notification);
	var currentItem = notifications[notification.txn_id];
	this.name = notification.item_name;
	this.number = notification.item_number;
}
