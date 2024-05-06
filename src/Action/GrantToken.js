const axios = require("axios");
const tokenHeaders = require("./TokenHeaders");
const tokenParameters = require("./TokenParameters");

const grantToken = async (bkashConfig) => {
  try {
    const response = await axios.post(
      `${bkashConfig?.base_url}/auth/grant-token`,
      tokenParameters(bkashConfig),
      {
        headers: tokenHeaders(bkashConfig),
      }
    );

    return response?.data?.id_token;
  } catch (e) {
    return e;
  }
};

module.exports = grantToken;
