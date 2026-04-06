# Pusher Setup Guide

## ⚠️ IMPORTANT: Environment Variables (Gadget)

**You MUST add these in Gadget dashboard → Settings → Environment Variables:**

```
PUSHER_APP_ID=2137606
PUSHER_KEY=e972331887dfc1bd1756
PUSHER_SECRET=e984e3cf5e46559a1306
PUSHER_CLUSTER=us3
```

| Variable | Value |
|----------|-------|
| `PUSHER_APP_ID` | `2137606` |
| `PUSHER_KEY` | `e972331887dfc1bd1756` |
| `PUSHER_SECRET` | `e984e3cf5e46559a1306` |
| `PUSHER_CLUSTER` | `us3` |

**Without these, auth will fail with:** `The "key" argument must be of type string... Received undefined`

## Deploy to Gadget

```bash
cd shopifyappchat && ggt push
```

## Configure Pusher Webhook

1. Go to [pusher.com](https://pusher.com) → Your App → **Webhooks**
2. Add a new webhook:
   - **URL:** `https://shopappchat.gadget.app/pusher-webhook`
   - **Events:** Check `presence` → `member_added` and `member_removed`

## How It Works

| Event | What Happens |
|-------|--------------|
| Customer opens chat | Subscribes to `presence-conversation-{id}` → Pusher sends `member_added` webhook → `isOnline: true` |
| Customer closes tab | WebSocket drops → Pusher sends `member_removed` webhook → `isOnline: false` |
| Browser crash | Same - Pusher detects socket drop |
| Network dies | Same - Pusher timeout → sends webhook |

## Architecture

```
Widget (Customer)                    Gadget Backend                     Pusher
      │                                    │                               │
      │─── Subscribe to presence ─────────>│                               │
      │    channel                         │── pusherAuth action ─────────>│
      │                                    │<── auth token ────────────────│
      │<─────────────────────────────────────── connected ─────────────────│
      │                                    │                               │
      │                                    │<── member_added webhook ──────│
      │                                    │    (marks isOnline: true)     │
      │                                    │                               │
      │    [Tab closes / crash]            │                               │
      │         ✕                          │<── member_removed webhook ────│
                                           │    (marks isOnline: false)    │
```

## Files Created/Modified

- `api/actions/widget/pusherAuth.js` - Auth action for presence channels
- `api/routes/POST-pusher-webhook.js` - Webhook endpoint for presence events
- `api/models/message/actions/create.js` - Triggers Pusher events on new messages
- `api/models/customer/schema.gadget.ts` - Added `isOnline` field
- `shopifyappchat-widget/src/hooks/useChat.js` - Presence channel subscription
