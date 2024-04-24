const fetch = require("node-fetch")
const { v4: uuidv4 } = require("uuid")
const authHeaders = require("../AuthHeaders")

const createPaymentWithAgreement = async (bkashConfig, paymentDetails) => {
  try {
    const { amount, callbackURL, orderId, reference, agreementId } = paymentDetails
    if(!amount){
      return {
        statusCode : 2065,
        statusMessage : 'amount required'
      }
    }else{
      if(amount < 1){
        return {
          statusCode : 2065,
          statusMessage : 'minimum amount 1'
        }
      }
    }

    if(!callbackURL){
      return {
        statusCode : 2065,
        statusMessage : 'callbackURL required'
      }
    }

    if(!agreementId){
        return {
          statusCode : 2065,
          statusMessage : 'agreementId required'
        }
      }

    const createResopnse = await fetch(bkashConfig?.base_url + "/payment/create", {
      method: "POST",
      headers: await authHeaders(bkashConfig),
      body: JSON.stringify({
        mode: "1001",
        currency: "BDT",
        intent: "sale",
        amount: amount, 
        agreementId: agreementId,
        callbackURL: callbackURL,
        payerReference: reference || "1",
        merchantInvoiceNumber: orderId || "Inv_" + uuidv4().substring(0, 5)
      }),
    })

    const createResult = await createResopnse.json()
    return createResult
  } catch (e) {
    return e
  }
}

module.exports = createPaymentWithAgreement
