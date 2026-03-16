# Read Receipts Implementation Plan

## Overview
Track when messages have been read by the recipient (customer or support agent).

---

## Backend Changes

### 1. Update Message Schema
Add `readAt` field to `api/models/message/schema.gadget.ts`:

```typescript
readAt: {
  type: "dateTime",
  includeTime: true,
  storageKey: "msg-readAt-XX"
},
```

### 2. Create `markMessagesRead` Global Action
Create `api/actions/markMessagesRead.js`:

```javascript
export const run = async ({ params, api }) => {
  const { conversationId, readerType } = params; // readerType: "merchant" | "support"

  // Mark all unread messages from the OTHER party as read
  const senderType = readerType === "merchant" ? "support" : "merchant";

  const messages = await api.message.findMany({
    filter: {
      conversationId: { equals: conversationId },
      senderType: { equals: senderType },
      readAt: { isSet: false }
    }
  });

  const now = new Date();
  for (const message of messages) {
    await api.message.update(message.id, { readAt: now });
  }

  return { markedCount: messages.length };
};

export const params = {
  conversationId: { type: "string" },
  readerType: { type: "string" } // "merchant" or "support"
};
```

---

## Widget Changes (Customer Side)

### 1. Mark Messages as Read When Viewing
In `useChat.js`, call `markMessagesRead` when:
- Chat window opens
- New messages are fetched

```javascript
const markAsRead = useCallback(async () => {
  if (!conversationId) return;
  try {
    await api.markMessagesRead({
      conversationId,
      readerType: "merchant"
    });
  } catch (err) {
    // Silent fail
  }
}, [conversationId]);

// Call when chat opens or messages update
useEffect(() => {
  if (isOpen && conversationId) {
    markAsRead();
  }
}, [isOpen, conversationId, messages, markAsRead]);
```

### 2. Display "Seen" Indicator (Optional)
Show when support has read merchant messages:

```jsx
{message.senderType === "merchant" && message.readAt && (
  <span className="sac-seen">Seen</span>
)}
```

---

## Dashboard Changes (Support Side)

### 1. Mark Messages as Read
When support opens a conversation, call:

```javascript
await api.markMessagesRead({
  conversationId,
  readerType: "support"
});
```

### 2. Display Read Status
In conversation view, show which messages have been read:

```jsx
{message.senderType === "support" && message.readAt && (
  <span className="text-xs text-muted-foreground">
    Seen {new Date(message.readAt).toLocaleTimeString()}
  </span>
)}
```

### 3. Unread Indicator in Sidebar
Show unread count or dot for conversations with unread messages:

```javascript
// In nav query, add unread count
const unreadCount = conversation.messages.filter(
  m => m.senderType === "merchant" && !m.readAt
).length;
```

---

## API Response Updates

### Update `initWidgetTwo` and `getWidgetMessages`
Include `readAt` in message selection:

```javascript
messages: {
  edges: {
    node: {
      id: true,
      content: true,
      senderType: true,
      createdAt: true,
      readAt: true  // Add this
    }
  }
}
```

---

## Summary of Files to Modify

| File | Change |
|------|--------|
| `api/models/message/schema.gadget.ts` | Add `readAt` field |
| `api/actions/markMessagesRead.js` | Create new action |
| `api/actions/initWidgetTwo.js` | Include `readAt` in response |
| `api/actions/getWidgetMessages.js` | Include `readAt` in response |
| `widget/src/hooks/useChat.js` | Call markAsRead, display status |
| `web/routes/conversation.jsx` | Call markAsRead, display status |
| `web/components/app/nav.jsx` | Show unread indicators |
