import { GlobalActionRun } from "gadget-server";

/**
 * Send a new message from merchant
 * @param {string} conversationId - The conversation ID
 * @param {string} content - The message content
 * @param {string} shopId - The external shop ID (for verification)
 * @returns {object} - { message }
 */
export const run: GlobalActionRun = async ({ params, api, logger }) => {
  const { conversationId, content, shopId, attachmentBase64, attachmentFileName, attachmentMimeType } = params;

  if (!conversationId || !shopId) {
    throw new Error("conversationId and shopId are required");
  }

  // Either content or attachment is required
  if (!content && !attachmentBase64) {
    throw new Error("content or attachment is required");
  }

  // Verify the conversation belongs to this shop
  const conversation = await api.conversation.maybeFindOne(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  if (conversation.externalShopId !== shopId) {
    throw new Error("Access denied");
  }

  // Build message data
  const messageData = {
    content: content || "",
    senderType: "merchant",
    conversation: { _link: conversationId }
  };

  // Add attachment if provided
  if (attachmentBase64) {
    messageData.attachment = {
      base64: attachmentBase64,
      fileName: attachmentFileName || "image.jpg",
      mimeType: attachmentMimeType || "image/jpeg"
    };
  }

  // Create the message
  const message = await api.message.create(messageData);

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
      createdAt: message.createdAt,
      attachment: message.attachment ? {
        url: message.attachment.url,
        mimeType: message.attachment.mimeType,
        fileName: message.attachment.fileName
      } : null
    }
  };
};

export const params = {
  conversationId: { type: "string" },
  content: { type: "string" },
  shopId: { type: "string" },
  attachmentBase64: { type: "string" },
  attachmentFileName: { type: "string" },
  attachmentMimeType: { type: "string" }
};
