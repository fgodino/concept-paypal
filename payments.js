var store = require('./store');
var config = require('./config');

var paypalSdk = config.paypalSdk;

var payload = config.getPayload({
  actionType: 'PAY',
  receiverList : {
    receiver : [
    {
      email:  'callefalsa@123.com',
    }
    ]
  }
});

exports.pay = pay = function(payID, callback){

  var purchase = store.getPurchase(payID);

  if(!purchase.single) payload.preapprovalKey = purchase.getPreKey();
  payload.receiverList.receiver[0].amount = purchase.amount;

  paypalSdk.pay(payload, function(err, res){

    if(err){
      callback(err);
    }
    purchase.paymentsLeft--;
    if(res.paymentApprovalUrl){
      return callback(null, res.paymentApprovalUrl);
    } else {
      return callback(null);
    }
  });

};

