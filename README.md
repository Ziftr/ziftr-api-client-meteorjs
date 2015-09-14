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
var configuration = {
  "keys": {
    "publishable_key" : "",
    "private_key"     : ""
  },
  "api_version": "0.1",
  "api_host": "http://sandbox.fpa.bz/"
}

ZiftrApi.get("orders", configuration)
  .then(function(response){
    console.log(response.body.orders);
  })
  .catch(function(error){
    console.log(error);
  });
```

## Links

* [Ziftr API package for MeteorJS on Github](https://github.com/Ziftr/ziftr-api-client-meteorjs/)
* [Ziftr website](http://www.ziftr.com/)
* [ZiftrPAY website](http://www.ziftrpay.com/)
