var assert = require("chai").assert
var should = require('chai').should();

beforeEach(function () {
  // restore db, yeah I know, we're testing the db and using it too, I think of it is multi-testing
  return require('../lib/pricing_api.js').updatePricingData(13860428, {value: 13.49, currency_code: 'USD'});
});

describe('PricingAPI', function () {
  describe('#getPricingData()', function () {
    it('should throw exception when id not present', function () {
      (function () {
        var PricingAPI = require('../lib/pricing_api.js');
        PricingAPI.getPricingData();
      }).should.throw('product id is not set');
    });
    it('should return data', function (done) {
      var PricingAPI = require('../lib/pricing_api.js');
      PricingAPI.getPricingData(13860428)
        .catch(done)
        .then(function (data) {
          try {
            var expected = {
              product_id: 13860428,
              value: 13.49,
              currency_code: 'USD'
            };
            delete data._id;
            assert.deepEqual(data, expected);
            done();
          } catch (x) {
            done(x);
          }
        });
    });
  });
});

describe('PricingAPI', function () {
  describe('#updatePricingData()', function () {
    var PricingAPI = require('../lib/pricing_api.js');
    it('should throw exception when id not present', function () {
      (function () {
        PricingAPI.updatePricingData();
      }).should.throw('product id is not set');
    });
    it('should throw exception when pricingData not present', function () {
      (function () {
        PricingAPI.updatePricingData(13860428);
      }).should.throw('product data is not set');
    });
    it('should throw exception when pricingData.value not present', function () {
      (function () {
        PricingAPI.updatePricingData(13860428, {});
      }).should.throw('product data.value is not set');
    });
    it('should throw exception when pricingData.currency_code not present', function () {
      (function () {
        PricingAPI.updatePricingData(13860428, {value: 1});
      }).should.throw('product data.currency_code is not set');
    });
    it('should update data', function (done) {
      PricingAPI.updatePricingData(13860428, {value: 2.56, currency_code: 'FRA'})
        .catch(done)
        .then(function (data) {
          PricingAPI.getPricingData(13860428)
            .catch(done)
            .then(function (data) {
              try {
                var expected = {
                  product_id: 13860428,
                  value: 2.56,
                  currency_code: 'FRA'
                };
                delete data._id;
                assert.deepEqual(data, expected);
                done();
              } catch (x) {
                done(x);
              }
            });
        });
    });
  });
});
