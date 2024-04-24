const authHeaders = require("./AuthHeaders")
const fetch = require("node-fetch")

const executePayment = async (bkashConfig, paymentId) => {
  const executeResponse = await fetch(bkashConfig?.base_url + "/payment/execute", {
    method: "POST",
    headers: await authHeaders(bkashConfig),
    body: JSON.stringify({
      paymentId,
    }),
  })

  const executeResult = await executeResponse.json()
  return executeResult
}

module.exports = executePayment
