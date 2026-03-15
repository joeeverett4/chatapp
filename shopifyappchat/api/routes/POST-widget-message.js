import { RouteHandler } from "gadget-server";

/**
 * Send a new message from merchant
 * Input: { conversationId, content, shopId }
 * Output: { message }
 */
const route = async ({ request, reply, api, logger }) => {
  try {
    const { conversationId, content, shopId } = request.body;

    if (!conversationId || !content || !shopId) {
      await reply.status(400).send({
        error: "conversationId, content, and shopId are required"
      });
      return;
    }

    // Verify the conversation belongs to this shop
    const conversation = await api.conversation.findOne(conversationId);

    if (!conversation) {
      await reply.status(404).send({ error: "Conversation not found" });
      return;
    }

    if (conversation.externalShopId !== shopId) {
      await reply.status(403).send({ error: "Access denied" });
      return;
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

    await reply.status(201).send({
      message: {
        id: message.id,
        content: message.content,
        senderType: message.senderType,
        createdAt: message.createdAt
      }
    });
  } catch (error) {
    logger.error({ error }, "Failed to send message");
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
