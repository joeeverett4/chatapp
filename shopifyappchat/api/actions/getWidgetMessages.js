import { GlobalActionRun } from "gadget-server";

/**
 * Fetch messages for a conversation
 * @param {string} conversationId - The conversation ID
 * @param {string} shopId - The external shop ID (for verification)
 * @returns {object} - { messages[], status }
 */
export const run: GlobalActionRun = async ({ params, api, logger }) => {
  const { conversationId, shopId } = params;

  if (!conversationId || !shopId) {
    throw new Error("conversationId and shopId are required");
  }

  // Fetch conversation with messages
  const conversation = await api.conversation.maybeFindOne(conversationId, {
    select: {
      id: true,
      externalShopId: true,
      status: true,
      operatorLastReadAt: true,
      messages: {
        edges: {
          node: {
            id: true,
            content: true,
            senderType: true,
            createdAt: true
          }
        }
      }
    }
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // Verify the conversation belongs to this shop
  if (conversation.externalShopId !== shopId) {
    throw new Error("Access denied");
  }

  // Extract messages from edges
  const messages = conversation.messages?.edges?.map(edge => edge.node) || [];

  return {
    messages,
    status: conversation.status,
    operatorLastReadAt: conversation.operatorLastReadAt
  };
};

export const params = {
  conversationId: { type: "string" },
  shopId: { type: "string" }
};
