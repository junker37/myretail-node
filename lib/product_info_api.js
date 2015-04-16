var Request = require('request');

// https://api.target.com/products/v3/13860428?fields=descriptions&id_type=TCIN&key=43cJWpLjH8Z8oR18KdrZDBKAgLLQKJjz
var getProductInfo = function (id) {
  if (!id) {
    throw new Error('id not defined');
  }
  var url = 'https://api.target.com/products/v3/' + id + '?fields=descriptions&id_type=TCIN&key=43cJWpLjH8Z8oR18KdrZDBKAgLLQKJjz';
  return new Promise(function (resolve, reject) {
    Request(url, function (err, response, body) {
      if (!err) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
};

var getProductName = function (id) {
  return getProductInfo(id)
    .then(function (info) {
      return info.product_composite_response.items[0].online_description.value;
    });
};

module.exports.getProductInfo = getProductInfo;
module.exports.getProductName = getProductName;
