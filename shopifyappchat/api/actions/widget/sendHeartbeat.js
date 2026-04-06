import { GlobalActionRun } from "gadget-server";

/**
 * Update customer's lastActiveAt timestamp for presence tracking
 * @param {string} email - The customer's email
 * @returns {object} - { success: boolean }
 */
export const run: GlobalActionRun = async ({ params, api, logger }) => {
  const { email } = params;

  if (!email) {
    throw new Error("email is required");
  }

  const customer = await api.customer.maybeFindFirst({
    filter: { email: { equals: email } }
  });

  console.log("customer");
  logger.info(customer);

  if (!customer) {
    logger.info("customer not found");
    return { success: false };
  }

  let customerUpdated = await api.customer.update(customer.id, {
    lastActiveAt: new Date().toISOString()
  });

  console.log("customer updated");
  logger.info(customerUpdated);

  return { success: true };
};

export const params = {
  email: { type: "string" }
};
