import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "conversation" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "DataModel-Conversation",
  fields: {
    country: { type: "string", storageKey: "conv-country-08" },
    customer: {
      type: "belongsTo",
      parent: { model: "customer" },
      storageKey: "conv-customer-09",
      searchIndex: false,
    },
    email: { type: "email", storageKey: "conv-email-07" },
    externalShopId: {
      type: "string",
      validations: { required: true },
      storageKey: "conv-extShopId-03",
      filterIndex: false,
      searchIndex: false,
    },
    lastReadAt: {
      type: "dateTime",
      includeTime: true,
      storageKey: "conv-lastReadAt-10",
    },
    messages: {
      type: "hasMany",
      children: { model: "message", belongsToField: "conversation" },
      storageKey: "conv-messages-05",
    },
    operatorLastReadAt: {
      type: "dateTime",
      includeTime: true,
      storageKey: "conv-operatorLastReadAt-11",
    },
    organization: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "organization" },
      storageKey: "conv-organization-06",
    },
    shopName: {
      type: "string",
      storageKey: "conv-shopName-04",
      filterIndex: false,
      searchIndex: false,
    },
    status: {
      type: "enum",
      default: "open",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["open", "pending", "closed"],
      storageKey: "conv-status-02",
    },
    subject: { type: "string", storageKey: "conv-subject-01" },
  },
};
