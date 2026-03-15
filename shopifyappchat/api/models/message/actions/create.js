import { applyParams, save } from "gadget-server";

/**
 * @param { CreateMessageActionContext } context
 */
export async function run({ params, record }) {
  applyParams(params, record);
  await save(record);
}

export const options = {
  actionType: "create",
};
