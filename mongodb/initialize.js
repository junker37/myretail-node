var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/myretail';

var insertPricingData = function (db) {
  return new Promise(function (resolve, reject) {
    var collection = db.collection('pricing');
    collection.insertOne({
      product_id: 13860428,
      value: 13.49,
      currency_code: 'USD'
    }, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var findPricingData = function (db, callback) {
  return new Promise(function (resolve, reject) {
    console.log('getting pricing collection');
    var collection = db.collection('pricing');
    console.log('querying');
    collection.find({product_id: 13860428})
      .toArray(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
};

MongoClient.connect(url, function (err, db) {
  if (!err) {
    console.log("Connected correctly to server");
    findPricingData(db)
      .then(function (data) {
        console.log(data);
        if (data.length == 0) {
          insertPricingData(db)
            .then(function (result) {
              console.log(result);
              findPricingData(db)
                .then(function (data) {
                  console.log(data);
                  db.close();
                });
            });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    console.log(err);
  }
});

