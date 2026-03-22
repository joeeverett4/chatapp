import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "testModel" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "Vso6rKG9d0DS",
  fields: {
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "Vso6rKG9d0DS-BelongsTo-User",
    },
  },
};
