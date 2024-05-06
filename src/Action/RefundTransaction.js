const axios = require("axios");
const authHeaders = require("./AuthHeaders");

const refundTransaction = async (bkashConfig, refundDetails) => {
  try {
    const response = await axios.post(
      `${bkashConfig?.base_url}/payment/refund`,
      {
        paymentId: refundDetails?.paymentId,
        trxID: refundDetails?.trxId,
        amount: refundDetails?.amount,
        sku: refundDetails?.sku || "sku",
        reason: refundDetails?.reason || "reason",
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

module.exports = refundTransaction;
