import { deleteRecord, ActionOptions } from "gadget-server";

export const run = async ({ record }) => {
  await deleteRecord(record);
};

export const options = {
  actionType: "delete",
};
