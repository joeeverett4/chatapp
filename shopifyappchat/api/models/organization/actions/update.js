import { applyParams, save, ActionOptions } from "gadget-server";

export const run = async ({ params, record }) => {
  applyParams(params, record);
  await save(record);
};

export const options = {
  actionType: "update",
};
