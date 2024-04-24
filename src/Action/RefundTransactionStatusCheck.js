const fetch = require("node-fetch")
const authHeaders = require("./AuthHeaders")

const refundTransactionStatusCheck = async (bkashConfig, refundDetails) => {
  const refundResponse = await fetch(bkashConfig?.base_url + "/query/refund", {
    method: "POST",
    headers: await authHeaders(bkashConfig),
    body: JSON.stringify({
      paymentId: refundDetails?.paymentId,
      trxID: refundDetails?.trxId
    }),
  })
  
  const refundResult = await refundResponse.json()
  return refundResult
}

module.exports = refundTransactionStatusCheck
