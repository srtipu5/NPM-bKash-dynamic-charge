const fetch = require("node-fetch")
const authHeaders = require("../AuthHeaders")

const cancelAgreement = async (bkashConfig, agreementId) => {
  const cancelAgreementResponse = await fetch(bkashConfig?.base_url + "/agreement/cancel", {
    method: "POST",
    headers: await authHeaders(bkashConfig),
    body: JSON.stringify({
      agreementId,
    }),
  })
  
  const cancelAgreementResult = await cancelAgreementResponse.json()
  return cancelAgreementResult
}

module.exports = cancelAgreement
