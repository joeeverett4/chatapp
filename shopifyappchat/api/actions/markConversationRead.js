import { GlobalActionRun } from "gadget-server";

/**
 * Mark a conversation as read by updating lastReadAt timestamp
 * @param {string} conversationId - The conversation ID
 * @param {string} shopId - The shop ID for validation
 * @returns {object} - { success: boolean }
 */
export const run: GlobalActionRun = async ({ params, api, logger }) => {

  console.log("markCation Readreadsds")
  const { conversationId, shopId } = params;

  logger.info({ conversationId, shopId }, "markConversationRead called");

  if (!conversationId || !shopId) {
    logger.error("Missing conversationId or shopId");
    throw new Error("conversationId and shopId are required");
  }

  const conversation = await api.conversation.maybeFindOne(conversationId, {
    select: { id: true, externalShopId: true }
  });

  logger.info({ conversation }, "Found conversation");

  if (!conversation) {
    logger.warn("Conversation not found");
    return { success: false };
  }

  // Validate ownership
  logger.info({ dbShopId: conversation.externalShopId, paramShopId: shopId }, "Comparing shopIds");
  if (conversation.externalShopId !== shopId) {
    logger.error("ShopId mismatch - unauthorized");
    throw new Error("Unauthorized");
  }

  await api.conversation.update(conversationId, {
    lastReadAt: new Date()
  });

  logger.info("lastReadAt updated successfully");
  return { success: true };
};

export const params = {
  conversationId: { type: "string" },
  shopId: { type: "string" }
};
