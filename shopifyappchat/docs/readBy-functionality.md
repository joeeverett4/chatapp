# ReadBy Functionality

This document explains how the read receipt system works in the ShopifyAppChat application.

## Overview

The readBy functionality tracks when a customer has read messages in a conversation. This allows support agents to see read receipts (similar to iMessage or WhatsApp) showing whether the customer has seen their messages.

## Architecture

### 1. Database Schema

The `conversation` model includes a `lastReadAt` field:

```typescript
// api/models/conversation/schema.gadget.ts
lastReadAt: {
  type: "dateTime",
  includeTime: true,
  storageKey: "conv-lastReadAt-10",
}
```

This timestamp represents when the customer last viewed the conversation.

### 2. Global Action: markConversationRead

Located at `api/actions/markConversationRead.js`, this action updates the `lastReadAt` timestamp.

**Parameters:**
- `conversationId` (string) - The conversation to mark as read
- `shopId` (string) - The shop ID for ownership validation

**Flow:**
1. Validates that both `conversationId` and `shopId` are provided
2. Fetches the conversation
3. Validates that the shop owns this conversation (`externalShopId` check)
4. Updates `lastReadAt` to the current timestamp
5. Returns `{ success: true }` or `{ success: false }`

### 3. Widget Integration

The chat widget (`shopifyappchat-widget/src/hooks/useChat.js`) calls `markAsRead()` when:
- The customer opens the chat widget
- The conversation is already active

```javascript
const markAsRead = useCallback(async () => {
  if (!conversationId || !shopId) return;
  await api.markConversationRead({ conversationId, shopId });
}, [conversationId, shopId]);
```

This is triggered in the `useEffect` that runs when `isOpen` becomes true:

```javascript
useEffect(() => {
  if (isOpen && conversationId) {
    fetchMessages();
    markAsRead();  // Mark as read when chat opens
    // ...
  }
}, [isOpen, conversationId, fetchMessages, markAsRead]);
```

### 4. Admin UI Display

The conversation page (`web/routes/conversation.jsx`) displays read receipts on support messages.

**Logic:**
```javascript
const isMessageRead = (message) => {
  if (message.senderType !== "support") return false;
  if (!lastReadAt) return false;
  return new Date(message.createdAt) <= lastReadAt;
};
```

A support message is considered "read" if:
1. It was sent by support (not the customer)
2. The conversation has a `lastReadAt` timestamp
3. The message was created before or at the `lastReadAt` time

**Visual Indicators:**
- Single check icon (`Check`) - Message sent but not read
- Double check icon (`CheckCheck`) - Message read by customer

## Data Flow

```
Customer opens chat widget
         │
         ▼
useChat.markAsRead() called
         │
         ▼
api.markConversationRead({ conversationId, shopId })
         │
         ▼
Global action validates ownership
         │
         ▼
conversation.lastReadAt = new Date()
         │
         ▼
Admin UI compares message.createdAt vs lastReadAt
         │
         ▼
Displays ✓ (sent) or ✓✓ (read) icon
```

## Security

- The `markConversationRead` action validates shop ownership before updating
- Only the shop that owns the conversation can mark it as read
- The shopId is passed from the widget configuration, preventing unauthorized access
