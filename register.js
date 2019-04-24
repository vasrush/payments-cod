import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "COD payments for Reaction Commerce",
  name: "payments-cod",
  icon: "fa fa-money",
  meta: {
    version: "1.0.0"
  },
  autoEnable: true,
  settings: {
    "payments-cod": {
      enabled: false,
      support: [
        "Authorize",
        "Capture"
      ]
    }
  },
  registry: [
    // Settings panel
    {
      provides: ["paymentSettings"],
      label: "cashOnDelivery", // used as part of translation key
      container: "dashboard",
      template: "codPaymentSettings"
    },
    // Payment form for checkout
    {
      template: "codPaymentForm",
      provides: ["paymentMethod"],
      icon: "fa fa-money"
    }
  ]
});


