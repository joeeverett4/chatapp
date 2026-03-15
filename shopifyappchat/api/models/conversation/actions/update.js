import { applyParams, save } from "gadget-server";

/**
 * @param { UpdateConversationActionContext } context
 */
export async function run({ params, record }) {
  applyParams(params, record);
  await save(record);
}

export const options = {
  actionType: "update",
};
