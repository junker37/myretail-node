# myretail-node
This code has a couple of endpoints.  One to get product info based on a product id, and another to updating pricing data for a product

GET /products/v{version}/{id} - Returns product information, name from an internal APIl, and pricing data from a key-value store (dynamodb in this case).

PUT /products/v{version}/{id} - Updates pricing data for the given product id.  Updates the data in the key-value store (dynamodb in this case).

This code uses the [Express JS framework](http://expressjs.com/) with [iojs](https://iojs.org/en/index.html)

## Testing
Run the tests using mocha.  MongoDB needs to be running for the tests to complete successfully.

## Start mongodb
If using ubuntu 12.04, use the script below. Otherwise, manually start it with dbpath mongodb/data
```
cd ./mongodb
./start_mongo.sh
```
manually start mongo
```
cd ./mongodb
mongod --dbpath ./data --smallfiles --nojournal
```
### Using iojs
If you have node installed, you need to replace the symlink to point to iojs. See [this issue](https://github.com/mochajs/mocha/issues/1498)
```
ls -l `which node`
lrwxrwxrwx 1 root root 22 Apr 14 20:05 /usr/bin/node -> /etc/alternatives/node
sudo ln -fs <path/to/project>/iojs-v1.6.4-linux-x64/bin/iojs /usr/bin/node
```

```
./node_modules/.bin/mocha
```
If you see output like this: "ReferenceError: Promise is not defined", see Using iojs
```
  ProductInfoAPI
    #getProductInfo()
      ✓ should throw exception when id not present (150ms)
      1) should return data


  1 passing (161ms)
  1 failing

  1) ProductInfoAPI #getProductInfo() should return data:
     ReferenceError: Promise is not defined
      at Object.getProductInfo (lib/product_info_api.js:9:14)
      at Context.<anonymous> (test/test_product_info_api.js:14:22)
```
You should see output like this
```
  ProductInfoAPI
    #getProductInfo()
      ✓ should throw exception when id not present (141ms)
      ✓ should return data (637ms)


  2 passing (789ms)
```

## Running
Make sure mongodb is running.  See Starting mongodb section above.

Startup the webserver
```
./iojs-v1.6.4-linux-x64/bin/iojs app/app.js
```
Open a browser to http://localhost:3000/products/v1/13860428 or, use curl
```
curl http://localhost:3000/products/v1/13860428
```
Output
```
{"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value":13.49,"currency_code":"USD"}}
```

#### Updating Pricing Data
```
curl -H "Content-Type: application/json" -X PUT -d '{"value":12.99,"currency_code":"USD"}' http://localhost:3000/products/v1/13860428
curl http://localhost:3000/products/v1/13860428
```
Output
```
{"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value":12.99,"currency_code":"USD"}}
```
