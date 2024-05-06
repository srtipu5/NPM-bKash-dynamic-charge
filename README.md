## bKash Dynamic Charge Payment

Library to integrate bKash Dynamic Charge Payment on your backend application.

# NPM Install

```
npm install bkash-dynamic-payment
```

# Yarn Install

```
yarn add bkash-dynamic-payment
```

# bkashConfig Setup (Sandbox)

```
const bkashConfig = {
  base_url : 'https://sbdynamic.pay.bka.sh/v1',
  username: '01300937619',
  password: '^Wl1a:vFM}=',
  app_key: '1zc62IvSLdUrKUBCNYT5mNv6dc',
  app_secret: 'ErLjX0BsABGk0T1ETpRbXoM7Gke3WtTWJcFxKTuUfQV234ZcKsO7'
 }
```

# bkashConfig Setup (Live)

```
const bkashConfig = {
  base_url : 'https://sbdynamic.pay.bka.sh/v1',
  username: 'your_bkash_provide_username',
  password: 'your_bkash_provide_password',
  app_key: 'your_bkash_provide_app_key',
  app_secret: 'your_bkash_provide_app_secret'
 }
```

## Without Agreement

bkashDynamicPaymentGateway.js

```
const express = require('express')
const { createPayment, executePayment, queryPayment, searchTransaction, refundTransaction } = require('bkash-dynamic-payment')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Middleware setup
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// bKash Credentials setup
const bkashConfig = {
  base_url : 'bKash_base_url',
  username: 'your_bkash_username',
  password: 'your_bkash_password',
  app_key: 'your_bkash_app_key',
  app_secret: 'your_bkash_app_secret'
 }

app.post("/bkash-checkout", async(req, res) => {
  try {
    const { amount, callbackURL, orderId, reference } = req.body
    const paymentDetails = {
      amount: amount || 10,                                                 // your product price
      callbackURL : callbackURL || 'http://127.0.0.1:3000/bkash-callback',  // your callback route
      orderId : orderId || 'Order_101',                                     // your orderId
      reference : reference || '1'                                          // your reference
    }
    const result =  await createPayment(bkashConfig, paymentDetails)
    res.send(result)
  } catch (e) {
    console.log(e)
  }
})

app.get("/bkash-callback", async(req, res) => {
  try {
    const { status, paymentId } = req.query
    let result
    let response = {
      statusCode : '400',
      statusMessage : 'Payment Failed'
    }
    if(status === 'success')  result =  await executePayment(bkashConfig, paymentId)

    if(result?.transactionStatus === 'Completed'){
      // payment success
      // insert result in your db
      response.statusCode = '200'
      response.statusMessage = 'Payment Successful'
    }

    // You may use here WebSocket, server-sent events, or other methods to notify your client
    res.send(response)
  } catch (e) {
    console.log(e)
  }
})

// Add this route under admin middleware
app.post("/bkash-refund", async (req, res) => {
  try {
    const { paymentId, trxId, amount } = req.body
    const refundDetails = {
      paymentId,
      trxId,
      amount,
    }
    const result = await refundTransaction(bkashConfig, refundDetails)
    res.send(result)
  } catch (e) {
    console.log(e)
  }
})

app.get("/bkash-search", async (req, res) => {
  try {
    const { trxId } = req.query
    const result = await searchTransaction(bkashConfig, trxId)
    res.send(result)
  } catch (e) {
    console.log(e)
  }
})

app.get("/bkash-query", async (req, res) => {
  try {
    const { paymentId } = req.query
    const result = await queryPayment(bkashConfig, paymentId)
    res.send(result)
  } catch (e) {
    console.log(e)
  }
})

app.listen(port, () =>
  console.log(`Example app listening at http://127.0.0.1:${port}`)
)

```

# Create Payment

```
  const paymentDetails = {
      amount: 10,                                      // your product price
      callbackURL : 'http://127.0.0.1:3000/callback',  // your callback route
      orderId : 'Order_101',                           // your orderId
      reference : '1'                                  // your reference
    }
const result =  await createPayment(bkashConfig, paymentDetails)
```

# Execute Payment

```
const result =  await executePayment(bkashConfig, paymentId)
```

# Query Payment

```
const result =  await queryPayment(bkashConfig, paymentId)
```

# Search Transaction

```
const result =  await searchTransaction(bkashConfig, trxId)
```

# Refund Transaction

```
const refundDetails = {
paymentId: "TR101001111",
trxId: "ASFFDDD8G",
amount: 10
}
const result =  await refundTransaction(bkashConfig, refundDetails)
```

## With Agreement

const { createAgreement, executeAgreement, cancelAgreement, createPaymentWithAgreement, executePayment, queryPayment, searchTransaction, refundTransaction } = require('bkash-dynamic-payment')

# Create Agreement

```
  const paymentDetails = {
      amount: 10,                                                // your product price
      callbackURL : 'http://127.0.0.1:3000/agreement-callback',  // your callback route
      orderId : 'Order_101',                                     // your orderId
      reference : '1'                                            // your reference
    }
const result =  await createAgreement(bkashConfig, paymentDetails)
```

# Execute Agreement

```
const result =  await executeAgreement(bkashConfig, paymentId)
```

# Cancel Agreement

```
const result =  await cancelAgreement(bkashConfig, agreementId)
```

# Create Payment With Agreement

```
  const paymentDetails = {
      agreementId: "TokenizedMerchant01L3IKB6H1565072174986"            // agreementId from executeAgreement API
      amount: 10,                                                       // your product price
      callbackURL : 'http://127.0.0.1:3000/payment-callback',           // your callback route
      orderId : 'Order_101',                                            // your orderId
      reference : '1'                                                   // your reference
    }
const result =  await createPaymentWithAgreement(bkashConfig, paymentDetails)
```

# Execute Payment

```
const result =  await executePayment(bkashConfig, paymentId)
```

# Query Payment

```
const result =  await queryPayment(bkashConfig, paymentId)
```

# Search Transaction

```
const result =  await searchTransaction(bkashConfig, trxId)
```

# Refund Transaction

```
const refundDetails = {
paymentId: "TR101001111",
trxId: "ASFFDDD8G",
amount: 10
}
const result =  await refundTransaction(bkashConfig, refundDetails)
```

