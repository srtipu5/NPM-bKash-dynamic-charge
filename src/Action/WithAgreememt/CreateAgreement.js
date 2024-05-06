const axios = require("axios");
const authHeaders = require("../AuthHeaders");

const createAgreement = async (bkashConfig, paymentDetails) => {
  try {
    const { callbackURL } = paymentDetails;

    if (!callbackURL) {
      return {
        statusCode: 2065,
        statusMessage: "callbackURL required",
      };
    }

    const response = await axios.post(
      `${bkashConfig?.base_url}/agreement/create`,
      {
        mode: "1000",
        callbackURL,
        payerReference: reference || "1",
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

module.exports = createAgreement;
