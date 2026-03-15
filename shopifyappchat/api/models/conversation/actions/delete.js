import { deleteRecord } from "gadget-server";

/**
 * @param { DeleteConversationActionContext } context
 */
export async function run({ record }) {
  await deleteRecord(record);
}

export const options = {
  actionType: "delete",
};
