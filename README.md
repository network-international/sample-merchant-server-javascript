# Sample merchant server for iOS & android SDK

![Banner](https://github.com/network-international/payment-sdk-ios/raw/master/assets/banner.jpg)


A simple & light weight NodeJS server that you can use to test Network International's iOS & Android SDK's.

### Setup
Create a `.env` file and add config.
```
API_KEY=XXX
IDENTITY_API_URL=XXX
GATEWAY_API_URL=XXX
PORT=3000
```
Replace `XXX` with your actual values which you can get from Network International's portal.

### Run
- `npm start` command will start the server.
- iOS or Android app will make a `POST` request to `/api/create_payment_order` for creating an order.
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
	"email": "user@domain.com" // Email
}
```