require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const {API_KEY, IDENTITY_API_URL, GATEWAY_API_URL} = process.env;
if(!API_KEY || !IDENTITY_API_URL || !GATEWAY_API_URL){
	console.error("Error!!! Env configs not found");
	process.exit();
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/create_payment_order', (req, res) => {
    var authOptions = {
        method: 'POST',
        url: IDENTITY_API_URL,
       form: {
         'grant_type': 'client_credentials'
       },
       headers: {
           'Authorization': 'Basic ' + API_KEY
       }
    }
    request(authOptions, function(error, response, body) {
        if (error) {
            console.log(error)
            return res.status(400).send({
                'error': error
            });
        } else {
            //console.log(body)
            var authJson = JSON.parse(body)
            var createOrderOptions = {
                method: 'POST',
                url: GATEWAY_API_URL,
                json: {
                    'action': req.body.action,
                    'amount': req.body.amount,
                    'language': req.body.language,
                    'description': req.body.description,
                    'merchantAttributes': {},
                    'emailAddress' : req.body.email || 'test@gmail.com',
                    'orderSummary': {
                            'total': {
                                'currencyCode': req.body.amount.currencyCode,
                                'value': req.body.amount.value
                            },
                            'items': [
                            ]
                        },

                    'billingAddress' : {
                        'address1' : 'Address Line 1',
                        'firstName' : 'Test',
                        'lastName' : 'User',
                        'city' : 'London',
                        'countryCode' : 'GB'
                    },
                },
                headers: {
                    'Authorization': 'Bearer ' + authJson.access_token,
                    'Content-Type': 'application/vnd.ni-payment.v2+json',
                    'Accept': 'application/vnd.ni-payment.v2+json'
                }
            };
            request(createOrderOptions, function(error, response, body) {
                if (error) {
                    console.log(error)
                    return res.status(400).send({
                        'error': error
                    });
                } else {
										const code = body['_links'].payment.href.split("=").slice(-1).pop();
                    var dto = {
                        orderReference: body['reference'],
												paymentAuthorizationUrl: body['_links']['payment-authorization'].href,
												code: code,
                        supportedCards: body.paymentMethods.card
                    }
                    res.send(dto)
                }
            })
        }
    });
})

app.listen(3000, () => {
    console.log('Listening on localhost:3000')
})
