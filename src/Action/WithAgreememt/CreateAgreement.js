const fetch = require("node-fetch")
const authHeaders = require("../AuthHeaders")

const createAgreement = async (bkashConfig, paymentDetails) => {
  try {
    const { callbackURL } = paymentDetails
  
    if(!callbackURL){
      return {
        statusCode : 2065,
        statusMessage : 'callbackURL required'
      }
    }

    const createAgreementResopnse = await fetch(bkashConfig?.base_url + "/agreement/create", {
      method: "POST",
      headers: await authHeaders(bkashConfig),
      body: JSON.stringify({
        mode: "1000",
        callbackURL: callbackURL,
        payerReference: reference || "1"
      }),
    })

    const createAgreementResult = await createAgreementResopnse.json()
    return createAgreementResult
  } catch (e) {
    return e
  }
}

module.exports = createAgreement
