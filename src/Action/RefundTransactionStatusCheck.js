const axios = require("axios");
const authHeaders = require("./AuthHeaders");

const refundTransactionStatusCheck = async (bkashConfig, refundDetails) => {
  try {
    const response = await axios.post(
      `${bkashConfig?.base_url}/query/refund`,
      {
        paymentId: refundDetails?.paymentId,
        trxID: refundDetails?.trxId,
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

module.exports = refundTransactionStatusCheck;
