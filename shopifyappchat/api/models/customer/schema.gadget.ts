import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "customer" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "H7iaqdtKf3Sg",
  fields: {
    country: { type: "string", storageKey: "FiOS6FE4Rkzd" },
    email: { type: "string", storageKey: "tWFI7iYNHKNg" },
    name: { type: "string", storageKey: "ptcYxMvGrN4H" },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "H7iaqdtKf3Sg-BelongsTo-User",
    },
  },
};
