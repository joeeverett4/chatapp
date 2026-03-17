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

  if (!customer) {
    return { success: false };
  }

  await api.customer.update(customer.id, {
    lastActiveAt: new Date().toISOString()
  });

  return { success: true };
};

export const params = {
  email: { type: "string" }
};
