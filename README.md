# ziftr-api-client-meteorjs
Ziftr API package for Meteor.JS

This branch is under active development and should not be considered stable for use in production systems. For more information please visit: [www.ziftrpay.com](http://www.ziftrpay.com/)

[![@ziftrapi on Twitter](http://img.shields.io/badge/twitter-%40ziftrapi-blue.svg?style=flat)](https://twitter.com/ziftrapi)
[![ziftr-api on atmospherejs](https://img.shields.io/badge/Atmosphere-0.1.0-blue.svg)](https://atmospherejs.com/ziftr/ziftr-api)

## Installation

```
meteor add ziftr/ziftr-api
```

## Usage

The following call will fetch all orders for the API keys' owner. Be sure to pass configuration data as shown.

```
// Set the configuration
ZiftrApi.config({
  "keys": {
    "publishable_key" : "pub_xxxxxxxxxxxxxxxxxxx",
    "private_key"     : "prv_xxxxxxxxxxxxxxxxxxx"
  },
  "api_version": "0.1",
  "api_host": "http://sandbox.fpa.bz/"
})

// Fetch the list of orders
ZiftrApi.get("orders")
  .then(function(response){
    console.log(response.body.orders);
  })
  .catch(function(error){
    console.log(error);
  });

// Insert a new order
ZiftrApi.post("orders", {
  data: {
    order: {
      currency_code: "USD",
      is_shipping_required: true,
      shipping_price: "2000"
    }
  }
})
  .then(function(response){
    console.log(response.body.orders);
  })
  .catch(function(error){
    console.log(error);
  })

```

## Configuration object

The config object describes the request options used to send the request.

### `keys.publishable_key`

Required.
Your ZiftrPAY API Public Key from the
[ZiftrPAY account info](https://www.ziftrpay.com/merchants/sandbox/info/) page

### `keys.private_key`

Required.
Your ZiftrPAY API Private Key from the
[ZiftrPAY account info](https://www.ziftrpay.com/merchants/sandbox/info/) page

### `api_version`

The version of the Ziftr API such as `0.1`.

### `api_host`

The hostname of the api endpoint:

* `http://sandbox.fpa.bz/`
* `http://api.fpa.bz/`

## Links

* [Ziftr API package for MeteorJS on Github](https://github.com/Ziftr/ziftr-api-client-meteorjs/)
* [Ziftr website](http://www.ziftr.com/)
* [ZiftrPAY website](http://www.ziftrpay.com/)
