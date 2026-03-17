# Email Notification Feature

When a customer is offline, send support messages to their email with delivery and read tracking.

## Overview

- Detect offline customers via heartbeat/lastActiveAt
- Send email when operator messages offline customer
- Track: "Sent to email" → "Delivered to email" → "Read in email"

## Database Changes

Add fields to `message` model:

```typescript
emailSentAt: { type: "dateTime", includeTime: true }
emailDeliveredAt: { type: "dateTime", includeTime: true }
emailReadAt: { type: "dateTime", includeTime: true }
```

## Implementation

### 1. Check if customer is offline

In message create action or a global action:

```javascript
const isCustomerOffline = (customer) => {
  if (!customer.lastActiveAt) return true;
  const inactiveTime = Date.now() - new Date(customer.lastActiveAt).getTime();
  return inactiveTime > 2 * 60 * 1000; // 2 minutes
};
```

### 2. Send email with tracking pixel

Global action: `sendMessageEmail.js`

```javascript
export const run = async ({ params, api, connections }) => {
  const { messageId, conversationId } = params;

  const message = await api.message.findOne(messageId);
  const conversation = await api.conversation.findOne(conversationId, {
    select: { email: true, shopName: true }
  });

  const trackingPixelUrl = `https://shopappchat.gadget.app/track-email-open?messageId=${messageId}`;

  // Use your email provider (SendGrid, Resend, etc.)
  await sendEmail({
    to: conversation.email,
    subject: `New message from ${conversation.shopName}`,
    html: `
      <p>${message.content}</p>
      <p><a href="https://yourshop.com">Reply in chat</a></p>
      <img src="${trackingPixelUrl}" width="1" height="1" />
    `
  });

  await api.message.update(messageId, { emailSentAt: new Date() });

  return { success: true };
};
```

### 3. Track email opens (Route)

Route: `GET-track-email-open.js`

```javascript
export default async function route({ request, reply, api }) {
  const { messageId } = request.query;

  if (messageId) {
    await api.markEmailRead({ messageId });
  }

  // Return 1x1 transparent GIF
  reply.header('Content-Type', 'image/gif');
  reply.header('Cache-Control', 'no-store, no-cache, must-revalidate');
  return reply.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
}
```

Global action: `markEmailRead.js`

```javascript
export const run = async ({ params, api }) => {
  const { messageId } = params;

  await api.message.update(messageId, {
    emailReadAt: new Date()
  });

  return { success: true };
};

export const params = {
  messageId: { type: "string" }
};
```

### 4. Track email delivery (Webhook)

Route: `POST-email-webhook.js`

```javascript
export default async function route({ request, reply, api }) {
  const event = request.body;

  // Example for SendGrid webhook
  if (event.event === 'delivered') {
    await api.message.update(event.messageId, {
      emailDeliveredAt: new Date()
    });
  }

  return reply.send({ received: true });
}
```

### 5. Trigger email on message create

In `message/actions/create.js`:

```javascript
export const onSuccess = async ({ record, api }) => {
  if (record.senderType === 'support') {
    const conversation = await api.conversation.findOne(record.conversationId, {
      select: { customer: { lastActiveAt: true } }
    });

    const isOffline = !conversation.customer?.lastActiveAt ||
      (Date.now() - new Date(conversation.customer.lastActiveAt).getTime() > 2 * 60 * 1000);

    if (isOffline) {
      await api.sendMessageEmail({
        messageId: record.id,
        conversationId: record.conversationId
      });
    }
  }
};
```

## UI Status Display

### Admin (conversation.jsx)

```javascript
const getMessageStatus = (message) => {
  if (message.emailReadAt) return "Read in email";
  if (message.emailDeliveredAt) return "Delivered to email";
  if (message.emailSentAt) return "Sent to email";
  if (lastReadAt && new Date(message.createdAt) <= lastReadAt) return "Read";
  return "Sent";
};
```

### Status Icons

| Status | Display |
|--------|---------|
| Sent | ✓ |
| Read | ✓✓ |
| Sent to email | ✉ |
| Delivered to email | ✉✓ |
| Read in email | ✉✓✓ |

## Email Provider Setup

### Option 1: SendGrid

1. Create SendGrid account
2. Get API key
3. Add to Gadget environment variables
4. Configure webhook for delivery events

### Option 2: Resend

1. Create Resend account
2. Get API key
3. Add to Gadget environment variables

## Notes

- Tracking pixels don't work if email client blocks images
- Some email clients pre-fetch images, causing false "read" signals
- Consider adding a "View in browser" link as backup tracking
