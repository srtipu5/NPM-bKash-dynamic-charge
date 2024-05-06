const axios = require("axios");
const authHeaders = require("../AuthHeaders");

const executeAgreement = async (bkashConfig, agreementId) => {
  try {
    const response = await axios.post(
      `${bkashConfig?.base_url}/agreement/execute`,
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

module.exports = executeAgreement;
