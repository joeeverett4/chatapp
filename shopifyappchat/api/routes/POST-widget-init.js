import { RouteHandler } from "gadget-server";

/**
 * Initialize or retrieve existing conversation for a shop
 * Input: { shopId, shopName }
 * Output: { conversationId, messages[] }
 */
const route = async ({ request, reply, api, logger }) => {
  try {
    const { shopId, shopName } = request.body;

    if (!shopId) {
      await reply.status(400).send({ error: "shopId is required" });
      return;
    }

    // Look for existing open conversation for this shop
    let conversation = await api.conversation.maybeFindFirst({
      filter: {
        externalShopId: { equals: shopId },
        status: { in: ["open", "pending"] }
      },
      select: {
        id: true,
        subject: true,
        status: true,
        shopName: true,
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

    // If no existing conversation, create a new one
    if (!conversation) {
      conversation = await api.conversation.create({
        externalShopId: shopId,
        shopName: shopName || "Unknown Shop",
        subject: "Support Chat",
        status: "open"
      });

      // Fetch with messages (empty for new conversation)
      conversation = await api.conversation.findOne(conversation.id, {
        select: {
          id: true,
          subject: true,
          status: true,
          shopName: true,
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
    }

    await reply.send({
      conversationId: conversation.id,
      messages: conversation.messages?.edges?.map(edge => edge.node) ?? []
    });
  } catch (error) {
    logger.error({ error }, "Failed to initialize widget");
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
