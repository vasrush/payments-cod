import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Reaction from "/imports/plugins/core/core/server/Reaction";
import { Packages } from "/lib/collections";


Meteor.methods({
  "payments-cod/getPackageData": function () {
    const shopId = Reaction.getShopId();
    const { _id, settings } = Packages.findOne({ name: "payments-cod", shopId });
    return {
      _id,
      settings
    };
  },
  /**
   * Capture a Charge. This actually does not "claim" the money from the user's bank account,
   * but rather `signals` that the postman collected the money from the client
   * (and transferred it to the shop owner)
   *
   * @param {Object} paymentData Object containing data about the transaction to capture
   * @return {Object} results normalized
   */
  "payments-cod/payment/capture": function (paymentData) {
    check(paymentData, Reaction.Schemas.PaymentMethod);
    const authorizationId = paymentData.transactionId;
    const amount = paymentData.amount;

    const result = {
      saved: true,
      response: {
        authorizationId: authorizationId,
        amount: amount,
        success: true
      }
    };
    return result;
  },
  /**
   * List refunds (called from Reaction core)
   * @param  {Object} paymentMethod Object containing the pertinant data
   * @return {Object} result
   */
  "payments-cod/refund/list": function (paymentMethod) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    // Refunds are not applicable for COD payment method.
    return [];
  }
});
