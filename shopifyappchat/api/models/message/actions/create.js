import { applyParams, save } from "gadget-server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

/**
 * @param { CreateMessageActionContext } context
 */
export async function run({ params, record }) {
  applyParams(params, record);
  await save(record);
}

export async function onSuccess({ record, api, logger }) {
  logger.info("=== MESSAGE CREATED ===", {
    messageId: record.id,
    conversationId: record.conversationId,
    senderType: record.senderType,
    contentLength: record.content?.length || 0
  });

  // Send Pusher notification for all messages
  try {
    const channelName = `presence-conversation-${record.conversationId}`;
    const payload = {
      id: record.id,
      content: record.content,
      senderType: record.senderType,
      createdAt: record.createdAt,
      attachment: record.attachment ? {
        url: record.attachment.url,
        mimeType: record.attachment.mimeType,
        fileName: record.attachment.fileName
      } : null
    };

    logger.info("Pusher: triggering event", { channelName, event: 'new-message', payload });

    const result = await pusher.trigger(channelName, 'new-message', payload);

    logger.info("Pusher: event sent successfully", { channelName, messageId: record.id, result });
  } catch (err) {
    logger.error("Pusher: FAILED to send event", {
      error: err.message,
      stack: err.stack,
      channelName: `presence-conversation-${record.conversationId}`
    });
  }

  // Send email if support message and customer is offline
  if (record.senderType === 'support') {
    logger.info("Support message - checking if customer is online");

    try {
      const conversation = await api.conversation.findOne(record.conversationId, {
        select: {
          id: true,
          customer: {
            id: true,
            email: true,
            isOnline: true
          }
        }
      });

      logger.info("Customer status", {
        customerId: conversation.customer?.id,
        email: conversation.customer?.email,
        isOnline: conversation.customer?.isOnline
      });

      // Use isOnline field (set by Pusher presence webhooks)
      const isOffline = !conversation.customer?.isOnline;

      if (isOffline) {
        logger.info("Customer is OFFLINE, sending email notification", { messageId: record.id });
        await api.widget.sendMessageEmail({
          messageId: record.id,
          conversationId: record.conversationId
        });
        logger.info("Email notification sent");
      } else {
        logger.info("Customer is ONLINE, skipping email notification");
      }
    } catch (err) {
      logger.error("Failed to check/send email", { error: err.message, stack: err.stack });
    }
  }
}

export const options = {
  actionType: "create",
};
