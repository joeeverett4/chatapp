import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "organization" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "DataModel-Organization",
  fields: {
    accessToken: { type: "string", storageKey: "5U2kZ2-gk_I3" },
    conversations: {
      type: "hasMany",
      children: {
        model: "conversation",
        belongsToField: "organization",
      },
      storageKey: "org-conversations-04",
    },
    name: {
      type: "string",
      validations: { required: true },
      storageKey: "org-name-01",
    },
    shops: {
      type: "hasMany",
      children: {
        model: "shop",
        belongsToField: "parentOrganization",
      },
      storageKey: "6OyY0UAjsoQd",
    },
    slug: {
      type: "string",
      validations: { required: true, unique: true },
      storageKey: "org-slug-02",
    },
    users: {
      type: "hasMany",
      children: { model: "user", belongsToField: "organization" },
      storageKey: "org-users-03",
    },
  },
};
