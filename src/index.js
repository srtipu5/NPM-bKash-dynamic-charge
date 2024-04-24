// Common
const executePaymentAPI = require("./Action/ExecutePayment")
const queryPaymentAPI = require("./Action/QueryPayment")
const searchTransactionAPI = require("./Action/SearchTransaction")
const refundTransactionAPI = require("./Action/RefundTransaction")
const refundTransactionCheckAPI = require("./Action/RefundTransactionStatusCheck")
const createPaymentAPI = require("./Action/WithoutAgreement/CreatePayment")
const createAgreementAPI = require("./Action/WithAgreememt/CreateAgreement")
const executeAgreementAPI = require("./Action/WithAgreememt/ExecuteAgreement")
const cancelAgreementAPI = require("./Action/WithAgreememt/CancelAgreement")
const createPaymentWithAgreementAPI = require("./Action/WithAgreememt/CreatePaymentWithAgreement")


// Common API 
async function executePayment(bkashConfig, paymentId) {
  return await executePaymentAPI(bkashConfig, paymentId)
}

async function queryPayment(bkashConfig, paymentId) {
  return await queryPaymentAPI(bkashConfig, paymentId)
}

async function searchTransaction(bkashConfig, trxId) {
  return await searchTransactionAPI(bkashConfig, trxId)
}

async function refundTransaction(bkashConfig, refundInfo) {
  const response = await refundTransactionCheckAPI(bkashConfig, refundInfo)

  if (response?.refundTrxId) {
    return response
  } else {
    return await refundTransactionAPI(bkashConfig, refundInfo)
  }
}


// Without Agreement API
async function createPayment(bkashConfig, paymentDetails) {
  return await createPaymentAPI(bkashConfig, paymentDetails)
}


// With Agreement API
async function createAgreement(bkashConfig, paymentDetails) {
  return await createAgreementAPI(bkashConfig, paymentDetails)
}

async function executeAgreement(bkashConfig, paymentId) {
  return await executeAgreementAPI(bkashConfig, paymentId)
}

async function cancelAgreement(bkashConfig, agreementId) {
  return await cancelAgreementAPI(bkashConfig, agreementId)
}

async function createPaymentWithAgreement(bkashConfig, paymentDetails) {
  return await createPaymentWithAgreementAPI(bkashConfig, paymentDetails)
}


module.exports = {
    createPayment,
    executePayment,
    queryPayment,
    searchTransaction,
    refundTransaction,
    createAgreement,
    executeAgreement,
    cancelAgreement,
    createPaymentWithAgreement

}
