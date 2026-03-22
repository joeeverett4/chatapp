# Inbound Email Setup for Chat

Route customer email replies back into the chat system.

## Current State

- Outbound emails are sent via Resend from `message@chat.ordersplitpro.co.uk`
- Reply-to is set to `reply+{conversationId}@chat.ordersplitpro.co.uk`
- Webhook handler exists at `POST-resend-webhook.js` but isn't receiving emails

## What's Missing

Resend needs to be configured to receive inbound emails and forward them to your webhook.

## Option 1: Resend Inbound Emails

### Step 1: Add Inbound Domain in Resend

1. Go to Resend Dashboard → Domains
2. Add domain for receiving: `chat.ordersplitpro.co.uk`
3. Enable "Inbound emails" for this domain

### Step 2: Add DNS Records

Resend will provide MX records. Add to your DNS:

```
Type: MX
Host: chat (or @ if using root domain)
Value: inbound.resend.com
Priority: 10
```

### Step 3: Configure Webhook

1. Go to Resend Dashboard → Webhooks
2. Add webhook endpoint: `https://shopappchat.gadget.app/resend-webhook`
3. Enable event: `email.received`

### Step 4: Fix the Code

In `api/routes/POST-resend-webhook.js` line 34, change:
```js
senderType: 'merchant'  // wrong
```
to:
```js
senderType: 'customer'  // correct
```

And add `customer` to the senderType enum in `api/models/message/schema.gadget.ts`.

---

## Option 2: Use PrivateEmail Forwarding

If PrivateEmail manages `chat.ordersplitpro.co.uk`:

1. Create a catch-all or specific mailbox for `reply+*@chat.ordersplitpro.co.uk`
2. Set up forwarding rules to parse and forward to your webhook
3. This is more complex and may require a mail processing service

---

## Option 3: Use a Different Inbound Email Service

Services with easier inbound email setup:

- **Mailgun** - Inbound routing with webhooks
- **Postmark** - Inbound processing with JSON webhooks
- **SendGrid** - Inbound Parse webhook

These can run alongside Resend (Resend for outbound, other service for inbound).

---

## Recommended Approach

If Resend supports inbound for your plan, use Option 1. Otherwise, consider Postmark or Mailgun for inbound since they have straightforward webhook-based inbound processing.

## Testing

Once configured, send a test reply to `reply+{conversationId}@chat.ordersplitpro.co.uk` and check:
1. Resend dashboard for inbound email received
2. Gadget logs for webhook activity
3. Chat inbox for the new message
