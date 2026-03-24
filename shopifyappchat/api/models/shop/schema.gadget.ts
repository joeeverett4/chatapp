import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shop" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "CGUz9VFy-m_H",
  fields: {
    domain: { type: "string", storageKey: "jqqJ_8gcMlBw" },
    name: { type: "string", storageKey: "tZgzjlLDc5t5" },
    parentOrganization: {
      type: "belongsTo",
      parent: { model: "organization" },
      storageKey: "aD8_4RdJmUsA",
    },
    shopId: { type: "number", storageKey: "IA_Yz_NBM6SS" },
    state: {
      type: "enum",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["INSTALLED", "UNINSTALLED"],
      storageKey: "Wb-fINtj8Fex",
    },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "CGUz9VFy-m_H-BelongsTo-User",
    },
  },
};
