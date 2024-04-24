const fetch = require("node-fetch")
const authHeaders = require("./AuthHeaders")

const queryPayment = async (bkashConfig, paymentId) => {
  const queryResponse = await fetch(bkashConfig?.base_url + "/query/payment", {
    method: "POST",
    headers: await authHeaders(bkashConfig),
    body: JSON.stringify({
      paymentId,
    }),
  })
  
  const queryResult = await queryResponse.json()
  return queryResult
}

module.exports = queryPayment
