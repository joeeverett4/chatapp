/**
 * Called when customer closes/leaves tab - updates presence status
 * @param {string} email - The customer's email
 * @param {string} conversationId - The conversation ID
 * @param {string} shopId - The shop ID
 * @returns {object} - { success: boolean }
 */
export const run = async ({ params, api, logger }) => {
  const { email, conversationId, shopId } = params;

  if (!email) {
    return { success: false };
  }

  logger.info({ email, conversationId, shopId }, "Customer disconnected");

  const customer = await api.customer.maybeFindFirst({
    filter: { email: { equals: email } }
  });

  if (!customer) {
    logger.info("Customer not found");
    return { success: false };
  }

  await api.customer.update(customer.id, {
    lastActiveAt: new Date().toISOString(),
    isOnline: false
  });

  logger.info({ customerId: customer.id }, "Customer marked offline");

  return { success: true };
};

export const params = {
  email: { type: "string" },
  conversationId: { type: "string" },
  shopId: { type: "string" }
};
