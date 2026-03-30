# ShopifyAppChat

A Shopify chat/messaging platform built on Gadget with an embeddable widget.

## Project Structure

```
parentfolder/
├── shopifyappchat/           # Main Gadget backend app
│   ├── api/
│   │   ├── actions/          # Global actions (shopifyPartnerApi, trackEvents, etc.)
│   │   ├── models/           # DB models (conversation, message, shop, organization, etc.)
│   │   └── routes/           # HTTP endpoints (widget-init, widget-message, etc.)
│   └── web/
│       ├── routes/           # React Router pages (inbox, conversation, profile)
│       └── components/       # UI components (Shadcn/Radix)
│
└── shopifyappchat-widget/    # Embeddable chat widget
    ├── src/
    │   ├── Widget.jsx        # Main widget component
    │   ├── analytics.js      # Custom analytics SDK
    │   └── components/       # ChatButton, ChatWindow, MessageInput, MessageList
    └── dist/                 # Built IIFE bundles for CDN
```

## Tech Stack

**Backend (Gadget):** Node.js, React 19, React Router v7, Tailwind v4, Radix UI, Resend (email)
**Widget:** React 18, Vite (IIFE build), custom analytics SDK
**Database:** PostgreSQL (Gadget-managed)

## Key Models

- **Organization** - Multi-tenant container (has shops, users, conversations)
- **Shop** - Shopify store (shopId, domain, state: INSTALLED/UNINSTALLED)
- **Conversation** - Chat thread (status: open/pending/closed, has messages)
- **Message** - Chat message (content, senderType, email tracking fields)
- **Customer** - End-user in conversations
- **AnalyticsFIVE** - Event tracking storage

## Important Files

**Backend Actions:**
- `api/actions/shopifyPartnerApi.js` - Syncs shop installs from Partner API (hourly)
- `api/actions/trackEventsTWO.js` - Analytics event ingestion
- `api/actions/sendWidgetMessage.js` - Send messages via widget
- `api/actions/sendMessageEmail.js` - Email notifications via Resend

**API Routes:**
- `POST /widget-init` - Initialize chat conversation
- `POST /widget-message` - Send message from widget
- `GET /widget-messages` - Retrieve conversation messages
- `POST /resend-webhook` - Email delivery tracking

**Widget:**
- `shopifyappchat-widget/src/Widget.jsx` - Main widget component
- `shopifyappchat-widget/src/analytics.js` - Analytics SDK
- `shopifyappchat-widget/src/hooks/useChat.js` - Core chat logic

## Commands

**Backend (shopifyappchat/):**
```bash
yarn build          # Production build
yarn dev            # Development server (via Gadget)
```

**Widget (shopifyappchat-widget/):**
```bash
npm run build            # Build widget IIFE bundle
npm run build:analytics  # Build analytics IIFE bundle
npm run dev              # Development server
```

## Widget Distribution

Distributed via jsDelivr CDN from GitHub:
```
https://cdn.jsdelivr.net/gh/joeeverett4/chatapp@{version}/shopifyappchat-widget/dist/widget.iife.js
https://cdn.jsdelivr.net/gh/joeeverett4/chatapp@{version}/shopifyappchat-widget/dist/analytics.iife.js
```

Current version tracked in `debug.md`. Deploy by git tag + push.

## Gadget Patterns

**Model Actions:**
```js
export const run = async ({ params, record, api, logger }) => {
  await api.save(record);
};
```

**Global Actions:**
```js
export const options = {
  triggers: { scheduler: [{ every: "hour", at: "45 mins" }] }
};
```

**HTTP Routes:**
```js
export default async function route({ request, reply, api, logger }) {
  // route logic with CORS
}
```

## Environment Variables

- `SHOPIFY_PARTNER_ORG_ID` - Shopify Partner org ID
- `SHOPIFY_PARTNER_ACCESS_TOKEN` - Shopify Partner API token
- `GADGET_ENV` - "development" or "production"

## Current Work

- Analytics event tracking and shop domain detection
- Widget initialization improvements
- Considering CDN alternatives to jsDelivr (unpkg, cdnjs, esm.sh)
