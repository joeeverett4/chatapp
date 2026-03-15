import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://shopappchat.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "DataModel-AppAuth-User",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "BYPbkV60zOoL",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "-5CEt52JsCcF",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "o9xOegoa5RY7",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "dSeoDhh0vgXo",
    },
    firstName: { type: "string", storageKey: "vo9IN4jbVYuz" },
    googleImageUrl: { type: "url", storageKey: "GcWjYQFVCt_i" },
    googleProfileId: { type: "string", storageKey: "JKDYAVg5d7Pe" },
    lastName: { type: "string", storageKey: "ojOQQE0ntpYH" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "6PxSEdhdhOT1",
    },
    messages: {
      type: "hasMany",
      children: { model: "message", belongsToField: "user" },
      storageKey: "user-messages-01",
    },
    organization: {
      type: "belongsTo",
      parent: { model: "organization" },
      storageKey: "user-organization-02",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "HE1wEBw-m_PT",
    },
    profilePicture: {
      type: "file",
      allowPublicAccess: true,
      storageKey: "2qId1bQDdLUH",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "bukOEK5kFK-8",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "yUGZCaeM9S5Z",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "-ibvlWeVa5gi",
    },
  },
};
