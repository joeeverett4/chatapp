import { Resend } from 'resend';

export const run = async ({ params, api, logger }) => {
  const { messageId, conversationId } = params;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const message = await api.message.findOne(messageId, {
    select: { id: true, content: true }
  });

  const conversation = await api.conversation.findOne(conversationId, {
    select: { email: true, shopName: true }
  });

  if (!conversation.email) {
    logger.warn("No email for conversation", { conversationId });
    return { success: false, error: "No email" };
  }

  const trackingPixelUrl = `https://shopappchat.gadget.app/track-email-open?messageId=${messageId}`;

  const { data, error } = await resend.emails.send({
    from: `${conversation.shopName || 'Support'} <message@chat.ordersplitpro.co.uk>`,
    replyTo: `reply+${conversationId}@chat.ordersplitpro.co.uk`,
    to: conversation.email,
    subject: `New message from ${conversation.shopName || 'Support'}`,
    tags: [
      { name: 'messageId', value: messageId }
    ],
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 16px; line-height: 1.5;">${message.content}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #666; font-size: 14px;">Reply to this message by visiting our chat.</p>
        <img src="${trackingPixelUrl}" width="1" height="1" style="display:none;" />
      </div>
    `
  });

  if (error) {
    logger.error("Failed to send email", { error });
    return { success: false, error: error.message };
  }

  await api.internal.message.update(messageId, { emailSentAt: new Date() });

  logger.info("Email sent", { messageId, emailId: data?.id });
  return { success: true, emailId: data?.id };
};

export const params = {
  messageId: { type: "string" },
  conversationId: { type: "string" }
};
