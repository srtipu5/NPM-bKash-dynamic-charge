const axios = require("axios");
const authHeaders = require("./AuthHeaders");

const executePayment = async (bkashConfig, paymentId) => {
  try {
    const response = await axios.post(
      `${bkashConfig?.base_url}/payment/execute`,
      {
        paymentId,
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

module.exports = executePayment;
