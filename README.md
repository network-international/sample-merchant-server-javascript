# Sample merchant server for iOS & android SDK

![Banner](https://github.com/network-international/payment-sdk-ios/raw/master/assets/banner.jpg)


A simple & light weight NodeJS server that you can use to test Network International's iOS & Android SDK's.

### Install dependencies
Run `yarn start` to install the dependencies.

### Start the server
- `API_KEY=XXX GATEWAY_API_URL=XXX IDENTITY_API_URL=XXX REALM=XXX PORT=3000 yarn start` will start the server.
Replace `XXX` with your actual values which you can get from Network International's portal.

- The sample iOS and Android apps will make a `POST` request to `/api/createOrder` for creating an order.


```js
// Sample request body
{
	"amount":{
		"currencyCode":"AED", // Currency code
		"value": 1000 // 10 AED
	},
	"action": "SALE", // AUTH or SALE
	"language": "en",
	"description":"", // Description of your order
	"emailAddress": "user@domain.com" // Email
}
```

For more info on integrating the N-Genius api to your server side app, see our [order creation guide](https://docs.ngenius-payments.com/reference#creating-orders)

For more info on the order creation api, see our [api reference](https://docs.ngenius-payments.com/reference#list-of-order-input-attributes)
