import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "analyticsEvent" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "R9lytkNDvSOC",
  fields: {
    distinctId: { type: "string", storageKey: "ae-distinctId" },
    event: {
      type: "string",
      validations: { required: true },
      storageKey: "ae-event",
    },
    properties: { type: "json", storageKey: "ae-properties" },
    sessionId: { type: "string", storageKey: "ae-sessionId" },
    timestamp: {
      type: "dateTime",
      includeTime: true,
      storageKey: "ae-timestamp",
    },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "R9lytkNDvSOC-BelongsTo-User",
    },
  },
};
