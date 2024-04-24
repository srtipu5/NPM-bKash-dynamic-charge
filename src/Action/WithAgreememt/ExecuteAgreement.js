const authHeaders = require("../AuthHeaders")
const fetch = require("node-fetch")

const executeAgreement = async (bkashConfig, agreementId) => {
  const executeAgreementResponse = await fetch(bkashConfig?.base_url + "/agreement/execute", {
    method: "POST",
    headers: await authHeaders(bkashConfig),
    body: JSON.stringify({
      agreementId,
    }),
  })

  const executeAgreementResult = await executeAgreementResponse.json()
  return executeAgreementResult
}

module.exports = executeAgreement
