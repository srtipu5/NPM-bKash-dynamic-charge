const axios = require("axios");
const authHeaders = require("../AuthHeaders");

const cancelAgreement = async (bkashConfig, agreementId) => {
  try {
    const response = await axios.post(
      `${bkashConfig?.base_url}/agreement/cancel`,
      {
        agreementId,
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

module.exports = cancelAgreement;
