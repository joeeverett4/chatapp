import { GlobalActionRun } from "gadget-server";

/**
 * Send a new message from merchant
 * @param {string} conversationId - The conversation ID
 * @param {string} content - The message content
 * @param {string} shopId - The external shop ID (for verification)
 * @returns {object} - { message }
 */
export const run: GlobalActionRun = async ({ params, api, logger }) => {
  const { conversationId, content, shopId } = params;

  if (!conversationId || !content || !shopId) {
    throw new Error("conversationId, content, and shopId are required");
  }

  // Verify the conversation belongs to this shop
  const conversation = await api.conversation.maybeFindOne(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  if (conversation.externalShopId !== shopId) {
    throw new Error("Access denied");
  }

  // Create the message
  const message = await api.message.create({
    content: content,
    senderType: "merchant",
    conversation: { _link: conversationId }
  });

  // Update conversation status to open if it was pending
  if (conversation.status === "pending") {
    await api.conversation.update(conversationId, {
      status: "open"
    });
  }

  return {
    message: {
      id: message.id,
      content: message.content,
      senderType: message.senderType,
      createdAt: message.createdAt
    }
  };
};

export const params = {
  conversationId: { type: "string" },
  content: { type: "string" },
  shopId: { type: "string" }
};
