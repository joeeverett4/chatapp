import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "message" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "DataModel-Message",
  fields: {
    attachment: {
      type: "file",
      allowPublicAccess: true,
      storageKey: "msg-attachment-08",
    },
    content: { type: "string", storageKey: "msg-content-01" },
    conversation: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "conversation" },
      storageKey: "msg-conversation-03",
    },
    emailDeliveredAt: {
      type: "dateTime",
      includeTime: true,
      storageKey: "msg-emailDeliveredAt-06",
    },
    emailReadAt: {
      type: "dateTime",
      includeTime: true,
      storageKey: "msg-emailReadAt-07",
    },
    emailSentAt: {
      type: "dateTime",
      includeTime: true,
      storageKey: "msg-emailSentAt-05",
    },
    senderType: {
      type: "enum",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["merchant", "support"],
      validations: { required: true },
      storageKey: "msg-senderType-02",
    },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "msg-user-04",
    },
  },
};
