import { applyParams, save } from "gadget-server";

/**
 * @param { CreateMessageActionContext } context
 */
export async function run({ params, record }) {
  applyParams(params, record);
  await save(record);
}

export async function onSuccess({ record, api, logger }) {
  // Only send email for support messages
  if (record.senderType !== 'support') {
    return;
  }

  try {
    const conversation = await api.conversation.findOne(record.conversationId, {
      select: {
        id: true,
        customer: {
          lastActiveAt: true
        }
      }
    });

    const lastActiveAt = conversation.customer?.lastActiveAt;
    const isOffline = !lastActiveAt ||
      (Date.now() - new Date(lastActiveAt).getTime() > 2 * 60 * 1000); // 2 minutes

    if (isOffline) {
      logger.info("Customer offline, sending email", { messageId: record.id });
      await api.sendMessageEmail({
        messageId: record.id,
        conversationId: record.conversationId
      });
    }
  } catch (err) {
    logger.error("Failed to check/send email", { error: err.message });
  }
}

export const options = {
  actionType: "create",
};
