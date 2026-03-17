export default async function route({ request, reply, api, logger }) {
  // Return 200 immediately so Resend doesn't retry
  reply.header('Content-Type', 'application/json');

  const event = request.body;

  logger.info("Resend webhook received", { body: request.body });

  try {
    // Get messageId from email tags or headers
    const messageId = event.data?.tags?.messageId;

    if (!messageId) {
      logger.warn("No messageId in webhook");
      return reply.send({ received: true });
    }

    switch (event.type) {
      case 'email.delivered':
        await api.internal.message.update(messageId, {
          emailDeliveredAt: new Date()
        });
        logger.info("Email marked as delivered", { messageId });
        break;

      case 'email.opened':
        // Backup for tracking pixel
        await api.internal.message.update(messageId, {
          emailReadAt: new Date()
        });
        logger.info("Email marked as read via webhook", { messageId });
        break;

      case 'email.bounced':
        logger.error("Email bounced", { messageId, data: event.data });
        break;
    }
  } catch (err) {
    logger.error("Webhook processing failed", { error: err.message });
  }

  return reply.code(200).send({ received: true });
}
