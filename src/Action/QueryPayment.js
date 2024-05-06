const axios = require("axios");
const authHeaders = require("./AuthHeaders");

const queryPayment = async (bkashConfig, paymentId) => {
  try {
    const response = await axios.post(
      `${bkashConfig?.base_url}/query/payment`,
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

module.exports = queryPayment;
