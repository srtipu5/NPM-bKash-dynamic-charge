const axios = require("axios");
const authHeaders = require("./AuthHeaders");

const searchTransaction = async (bkashConfig, trxId) => {
  try {
    const response = await axios.post(
      `${bkashConfig?.base_url}/search/transaction`,
      {
        trxID: trxId,
      },
      {
        headers: await authHeaders(bkashConfig),
      }
    );

    return response.data;
  } catch (e) {
    return e;
  }
};

module.exports = searchTransaction;
