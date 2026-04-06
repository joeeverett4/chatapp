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
  // Send Pusher notification for all messages
  try {
    const channelName = `presence-conversation-${record.conversationId}`;
    await pusher.trigger(channelName, 'new-message', {
      id: record.id,
      content: record.content,
      senderType: record.senderType,
      createdAt: record.createdAt,
      attachment: record.attachment ? {
        url: record.attachment.url,
        mimeType: record.attachment.mimeType,
        fileName: record.attachment.fileName
      } : null
    });
    logger.info("Pusher: sent new-message event", { channelName, messageId: record.id });
  } catch (err) {
    logger.error("Pusher: failed to send event", { error: err.message });
  }

  // Send email if support message and customer is offline
  if (record.senderType === 'support') {
    try {
      const conversation = await api.conversation.findOne(record.conversationId, {
        select: {
          id: true,
          customer: {
            isOnline: true
          }
        }
      });

      // Use isOnline field (set by Pusher presence webhooks)
      const isOffline = !conversation.customer?.isOnline;

      if (isOffline) {
        logger.info("Customer offline, sending email", { messageId: record.id });
        await api.widget.sendMessageEmail({
          messageId: record.id,
          conversationId: record.conversationId
        });
      }
    } catch (err) {
      logger.error("Failed to check/send email", { error: err.message });
    }
  }
}

export const options = {
  actionType: "create",
};
