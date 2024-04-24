const fetch = require("node-fetch")
const authHeaders = require("./AuthHeaders")

const searchTransaction = async (bkashConfig, trxId) => {
  const searchResponse = await fetch(bkashConfig?.base_url + "/search/transaction", {
    method: "POST",
    headers: await authHeaders(bkashConfig),
    body: JSON.stringify({
      trxID: trxId,
    }),
  })

  const searchResult = await searchResponse.json()
  return searchResult
}

module.exports = searchTransaction
