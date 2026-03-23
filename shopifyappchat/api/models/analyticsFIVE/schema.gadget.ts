import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "analyticsFIVE" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "hcAPysSKZIff",
  fields: {
    distinctId: { type: "string", storageKey: "bsKAclstjHZR" },
    event: { type: "string", storageKey: "QbFtEY3XHNux" },
    properties: { type: "json", storageKey: "ENBhBqs2LZSW" },
    sessionId: { type: "string", storageKey: "-gb92JFbbwO7" },
    timestamp: {
      type: "dateTime",
      includeTime: true,
      storageKey: "YnUs2a0XcZTY",
    },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "hcAPysSKZIff-BelongsTo-User",
    },
  },
};
