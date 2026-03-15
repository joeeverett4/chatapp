import { RouteHandler } from "gadget-server";

/**
 * Fetch messages for a conversation
 * Input: conversationId (URL param), shopId (query param)
 * Output: { messages[] }
 */
const route = async ({ request, reply, api, logger }) => {
  try {
    const { conversationId } = request.params;
    const { shopId } = request.query;

    if (!conversationId || !shopId) {
      await reply.status(400).send({
        error: "conversationId and shopId are required"
      });
      return;
    }

    // Fetch conversation with messages
    const conversation = await api.conversation.findOne(conversationId, {
      select: {
        id: true,
        externalShopId: true,
        status: true,
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
      await reply.status(404).send({ error: "Conversation not found" });
      return;
    }

    // Verify the conversation belongs to this shop
    if (conversation.externalShopId !== shopId) {
      await reply.status(403).send({ error: "Access denied" });
      return;
    }

    // Extract messages from edges
    const messages = conversation.messages?.edges?.map(edge => edge.node) || [];

    await reply.send({
      messages,
      status: conversation.status
    });
  } catch (error) {
    logger.error({ error }, "Failed to fetch messages");
    await reply.status(500).send({ error: "Internal server error" });
  }
};

route.options = {
  cors: {
    // allow requests from any origin
    origin: true,
    // ... more options here if needed
  },
};

export default route;
