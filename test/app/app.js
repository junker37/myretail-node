var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var infoAPI = require('../lib/product_info_api.js');
var pricingAPI = require('../lib/pricing_api.js');

app.get('/products/v:version/:id', function (req, res) {
  var productId = parseInt(req.params.id);
  Promise.all([infoAPI.getProductName(productId), pricingAPI.getPricingData(productId)])
    .then(function (values) {
      var name = values[0];
      var pricingData = values[1];
      var data = {
        id: productId,
        name: name,
        current_price: null
      };
      if (pricingData) {
        data.current_price = {
          value: pricingData.value,
          currency_code: pricingData.currency_code
        };
      }
      res.send(data);
    }).catch(function (err) {
      res.status(400).send({error: err.message});
    });
});

app.put('/products/v:version/:id', function (req, res) {
  try {
    pricingAPI.updatePricingData(req.params.id, req.body)
      .then(function (result) {
        res.send();
      })
      .catch(function (err) {
        res.status(400).send({error: err.message});
      });
  } catch (err) {
    res.status(400).send({error: err.message});
  }
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('myretail app listening at http://%s:%s', host, port);

});
