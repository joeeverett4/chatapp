import { GlobalActionRun } from "gadget-server";

/**
 * Initialize or retrieve existing conversation for a shop
 * @param {string} shopId - The external shop ID
 * @param {string} shopName - The shop name (optional)
 * @param {string} orgSlug - The organization slug
 * @returns {object} - { conversationId, messages[] }
 */
export const run: GlobalActionRun = async ({ params, api, logger }) => {
  const { shopId, shopName } = params;

  console.log("params")
  logger.info(params)

  let orgSlug = "flexcommerce"

  if (!shopId) {
    throw new Error("shopId is required");
  }


  // Find the organization
  const organization = await api.organization.maybeFindFirst({
    filter: { slug: { equals: orgSlug } }
  });

  if (!organization) {
    throw new Error("Organization not found");
  }

  // Look for existing open conversation for this shop in this organization
  let conversation = await api.conversation.maybeFindFirst({
    filter: {
      externalShopId: { equals: shopId },
      status: { in: ["open", "pending"] },
      organizationId: { equals: organization.id }
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
      status: "open",
      organization: { _link: organization.id }
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

  return {
    conversationId: conversation.id,
    messages: conversation.messages?.edges?.map(edge => edge.node) ?? []
  };
};

export const params = {
  shopId: { type: "string" },
  shopName: { type: "string" },
  orgSlug: { type: "string" }
};
