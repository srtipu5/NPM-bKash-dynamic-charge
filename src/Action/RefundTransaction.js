const fetch = require("node-fetch")
const authHeaders = require("./AuthHeaders")

const refundTransaction = async (bkashConfig, refundDetails) => {
  const refundResponse = await fetch(bkashConfig?.base_url + "/payment/refund'", {
    method: "POST",
    headers: await authHeaders(bkashConfig),
    body: JSON.stringify({
      paymentId: refundDetails?.paymentId,
      trxID: refundDetails?.trxId,
      amount: refundDetails?.amount,
      sku : refundDetails?.sku || 'sku',
      reason: refundDetails?.reason || 'reason'
    }),
  })
  
  const refundResult = await refundResponse.json()
  return refundResult
}

module.exports = refundTransaction
