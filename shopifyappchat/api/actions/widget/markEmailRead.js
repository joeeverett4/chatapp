export const run = async ({ params, api, logger }) => {
  const { messageId } = params;

  if (!messageId) {
    return { success: false };
  }

  const message = await api.message.maybeFindOne(messageId);

  if (!message) {
    logger.warn("Message not found", { messageId });
    return { success: false };
  }

  // Only update if not already marked as read
  if (!message.emailReadAt) {
    await api.internal.message.update(messageId, {
      emailReadAt: new Date()
    });
    logger.info("Email marked as read", { messageId });
  }

  return { success: true };
};

export const params = {
  messageId: { type: "string" }
};
