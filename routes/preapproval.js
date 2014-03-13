var store = require('../store.js');
var payments = require('../payments');
var config = require('../config');

var items = store.getItems();

var paypalSdk = config.paypalSdk;

var payload = config.getPayload({
  startingDate:                   new Date().toISOString(),
  displayMaxTotalAmount:          true
});

module.exports = function(req, res){
  var itemId = req.query.item;

  var purchaseId = store.addPurchase(itemId);

  currentItem = items[itemId];

  console.log(currentItem);
  if(currentItem.single){
    return payments.pay(purchaseId, function(err, url){
      if(err){
        return res.send(400);
      }
      else{
        return res.redirect(url);
      }
    });
  }

  paypalSdk.preapproval(payload, function (err, response) {
    if (err) {
      return res.send(500, err);
    } else {
      store.getPurchase(purchaseId).setPreKey(response.preapprovalKey);
      return res.redirect(response.preapprovalUrl);
    }
  });
};
