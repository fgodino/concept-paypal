
var ipn = require("../my-verify.js");
var store = require("../store");

var notifications = {};

exports.ipn_listener = function (req, res) {
	res.send(200);

	console.log(req.body);

	ipn.verify(req.body, function (err, msg) {
		if (err){
			console.log(err, msg);
		}
		else{
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
