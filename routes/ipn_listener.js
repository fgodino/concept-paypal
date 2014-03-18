
var ipn = require("../my-verify.js");
var store = require("../store");
var qs = require('qs');
var utils = require('../utils');
var ipn_preapproval = require('./ipn_listener_preapproval');
var ipn_pay = require('./ipn_listener_pay');

var notifications = {};

exports.ipn_listener = function (req, res) {
	res.send(200);

	var parsedBody;

	ipn.verify(req.body, function (err, msg) {
		if (err){
			console.log(err, msg);
		}
		else{
			console.log("sin parsear--------------------",  req.body);
			parsedBody = qs.parse(utils.replace(req.body));

			console.log("parseado--------------------", parsedBody);
			if(parsedBody.status == 'COMPLETED'){
				/* Hay que comprobar que el email pertenece a una cuenta de Paypal
				 * (receiver)
				 * Hay que comprobar que el id de la transacción no esté repetido
				 * Verificar que el artículo se corresponde con el precio indicado */
				 if(parsedBody["preapproval_key"]){
				 	ipn_preapproval.ipn_listener_preapproval(parsedBody["preapproval_key"]);
				 }
				 if(parsedBody["pay_key"]) {
				 	ipn_pay.ipn_listener_pay(parsedBody["pay_key"]);
				 }
				}
			}
		});
}
