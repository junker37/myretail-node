var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/myretail';

var connect = function () {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
};

/**
 *
 * @param productId the product id
 * @returns {*} pricing data for the given product
 */
var getPricingData = function (productId) {
  if (!productId) {
    throw new Error('product id is not set');
  }
  return connect()
    .then(function (db) {
      return new Promise(function (resolve, reject) {
        db.collection('pricing').findOne({product_id: productId}, function (err, item) {
          if (err) {
            reject(err);
          } else {
            resolve(item);
          }
        });
      });
    });
};

/**
 * Creates/updates pricing data for a given product
 * @param productId the product id
 * @param pricingData the pricing data to update
 * @returns {*}
 */
var updatePricingData = function (productId, pricingData) {
  if (!productId) {
    throw new Error('product id is not set');
  }
  if (!pricingData) {
    throw new Error('product data is not set');
  }
  if (!pricingData['value']) {
    throw new Error('product data.value is not set');
  }
  if (!pricingData['currency_code']) {
    throw new Error('product data.currency_code is not set');
  }
  return connect()
    .then(function (db) {
      return new Promise(function (resolve, reject) {
        db.collection('pricing')
          .updateOne(
          {product_id: productId}, {
            $set: {
              value: pricingData.value,
              currency_code: pricingData.currency_code
            }
          },
          {upsert: true},
          function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
      });
    });
};

module.exports.getPricingData = getPricingData;
module.exports.updatePricingData = updatePricingData;