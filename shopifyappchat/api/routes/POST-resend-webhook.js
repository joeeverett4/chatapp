export default async function route({ request, reply, api, logger }) {
  // Return 200 immediately so Resend doesn't retry
  reply.header('Content-Type', 'application/json');

  const event = request.body;

  logger.info("Resend webhook received", { type: event.type, body: request.body });

  try {
    // Handle inbound email (customer reply)
    if (event.type === 'email.received') {
      const toAddress = event.data?.to?.[0];
      const fromEmail = event.data?.from;
      const textBody = event.data?.text || event.data?.html?.replace(/<[^>]*>/g, '') || '';

      // Extract conversationId from reply+{conversationId}@chat.ordersplitpro.co.uk
      const match = toAddress?.match(/reply\+([^@]+)@/);
      if (match && match[1]) {
        const conversationId = match[1];

        // Clean up the reply - remove quoted text (lines starting with >)
        const cleanedContent = textBody
          .split('\n')
          .filter(line => !line.trim().startsWith('>'))
          .join('\n')
          .trim()
          .split(/On .* wrote:/)[0] // Remove "On [date] [person] wrote:" and everything after
          .trim();

        if (cleanedContent) {
          // Create message from customer
          await api.message.create({
            content: cleanedContent,
            senderType: 'merchant',
            conversation: { _link: conversationId }
          });
          logger.info("Inbound email added to conversation", { conversationId, fromEmail });
        }
      } else {
        logger.warn("Could not extract conversationId from to address", { toAddress });
      }
      return reply.send({ received: true });
    }

    // Handle outbound email events
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
