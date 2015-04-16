# myretail-node
This code uses iojs.

## Testing
Run the tests using mocha.  MongoDB needs to be running for the tests to complete successfully.

## Start mongodb.
```
cd .mongodb
./start_mongo.sh
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
