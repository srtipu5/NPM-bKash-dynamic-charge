const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const authHeaders = require("../AuthHeaders");

const createPaymentWithAgreement = async (bkashConfig, paymentDetails) => {
  try {
    const { amount, callbackURL, orderId, reference, agreementId } =
      paymentDetails;
    if (!amount) {
      return {
        statusCode: 2065,
        statusMessage: "amount required",
      };
    } else {
      if (amount < 1) {
        return {
          statusCode: 2065,
          statusMessage: "minimum amount 1",
        };
      }
    }

    if (!callbackURL) {
      return {
        statusCode: 2065,
        statusMessage: "callbackURL required",
      };
    }

    if (!agreementId) {
      return {
        statusCode: 2065,
        statusMessage: "agreementId required",
      };
    }

    const response = await axios.post(
      `${bkashConfig?.base_url}/payment/create`,
      {
        mode: "1001",
        currency: "BDT",
        intent: "sale",
        amount,
        agreementId,
        callbackURL,
        payerReference: reference || "1",
        merchantInvoiceNumber: orderId || "Inv_" + uuidv4().substring(0, 5),
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

module.exports = createPaymentWithAgreement;
