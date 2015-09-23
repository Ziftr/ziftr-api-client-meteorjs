# ziftr-api-client-meteorjs
Ziftr API package for Meteor.JS

This branch is under active development and should not be considered stable for use in production systems. For more information please visit: [www.ziftrpay.com](http://www.ziftrpay.com/)

[![@ziftrapi on Twitter](http://img.shields.io/badge/twitter-%40ziftrapi-blue.svg?style=flat)](https://twitter.com/ziftrapi)
[![ziftr-api on atmospherejs](https://img.shields.io/badge/Atmosphere-0.1.0-blue.svg)](https://atmospherejs.com/ziftr/ziftr-api)

## Installation

```
meteor add ziftr:ziftr-api
```

## Usage

The following call will fetch all orders for the API keys' owner. Be sure to pass configuration data as shown.

```
// Set the configuration (must happen first)
ZiftrApi.config({
  "keys": {
    "publishable_key" : "pub_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "private_key"     : "prv_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  },
  "api_version" : "0.1",
  "api_host"    : "http://sandbox.fpa.bz/"
})

// Fetch the list of orders
try{
  var response = ZiftrApi.get("orders");
  console.log(response.body.orders);
}
catch(err){
  console.log(error);
}

// Insert a new order
var response = ZiftrApi.post("orders", {
  data: {
    order: {
      currency_code: "USD",
      is_shipping_required: true,
      shipping_price: "2000"
    }
  }
});
```

## Meteor.methods

When using this in `Meteor.methods()`, you must use the wrapped version:

```
Meteor.methods({
  my_method: function(){
    var ordersResp = ZiftrApi.getWrapAsync("orders", null);
  },
});
```

## Configuration object

The config object describes the request options used to send the request.

### `keys.publishable_key`

Required.
Your ZiftrPAY API Public Key from the
[ZiftrPAY account info](https://www.ziftrpay.com/merchants/sandbox/info/) page.

The type of key (live or sandbox) you use must match the URL you use.
See `api_host` for more information.

### `keys.private_key`

Required.
Your ZiftrPAY API Private Key from the
[ZiftrPAY account info](https://www.ziftrpay.com/merchants/sandbox/info/) page.

The private key is not needed for all API routes. It is advised you do not use
the private key if you don't have to.

The type of key (live or sandbox) you use must match the URL you use.
See `api_host` for more information.

### `api_version`

The version of the Ziftr API you wish to use such as `0.1`.

### `api_host`

The hostname of the api endpoint:

* `http://sandbox.fpa.bz/` : Used with sandbox API keys and not for using in production systems.
* `http://api.fpa.bz/` : Used with live API keys and for use in production systems.

## Links

* [Ziftr API package for MeteorJS on Github](https://github.com/Ziftr/ziftr-api-client-meteorjs/)
* [Ziftr website](http://www.ziftr.com/)
* [ZiftrPAY website](http://www.ziftrpay.com/)
