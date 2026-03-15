# Embeddable Chat Widget Implementation Plan

## Overview
Create an embeddable React chat widget (similar to Crisp) that Shopify app developers can add to their app's frontend, allowing merchants to chat directly with the app developer/support team.

## Architecture

```
Merchant's Shopify App                    Your Gadget Backend
┌─────────────────────────┐              ┌─────────────────────────┐
│  <script src="...">     │              │  Widget API Routes      │
│                         │──API Calls──▶│  - POST-widget-init     │
│  ┌─────────────────┐    │              │  - POST-widget-message  │
│  │ React Widget    │    │              │  - GET-widget-messages  │
│  │ (floating chat) │    │              └─────────────────────────┘
│  └─────────────────┘    │
└─────────────────────────┘

Widget Project (separate)                 Hosting
┌─────────────────────────┐              ┌─────────────────────────┐
│  widget/                │   Deploy     │  Vercel / Netlify       │
│  ├── src/               │─────────────▶│  (production)           │
│  │   ├── Widget.jsx     │              │                         │
│  │   └── main.jsx       │   Dev        │  localhost:5173         │
│  └── vite.config.js     │─────────────▶│  (development)          │
└─────────────────────────┘              └─────────────────────────┘
```

## Implementation Steps

### Step 1: Create Widget API Routes (in Gadget)

**Files to create in `api/routes/`:**

1. `POST-widget-init.js`
   - Initializes or retrieves existing conversation for a shop
   - Input: `{ shopId, shopName }`
   - Output: `{ conversationId, messages[] }`
   - Creates new conversation if none exists, or returns existing open one

2. `POST-widget-message.js`
   - Sends a new message from merchant
   - Input: `{ conversationId, content, shopId }`
   - Output: `{ message }`
   - Sets `senderType: "merchant"`

3. `GET-widget-messages-[conversationId].js`
   - Fetches messages for a conversation
   - Input: `conversationId` (URL param), `shopId` (query param)
   - Output: `{ messages[] }`
   - Security: Validates shopId matches conversation's externalShopId

All routes will have CORS enabled (`origin: "*"`) for cross-origin access.

### Step 2: Create React Widget Project (separate folder)

**Project structure:**
```
widget/
├── package.json
├── vite.config.js
├── index.html            # For local testing
├── src/
│   ├── main.jsx          # Entry point, mounts widget
│   ├── Widget.jsx        # Main widget component
│   ├── components/
│   │   ├── ChatButton.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── MessageList.jsx
│   │   └── MessageInput.jsx
│   ├── hooks/
│   │   └── useChat.js    # Chat state & API calls
│   └── styles.css        # Scoped widget styles
```

**Vite config for library build:**
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'ShopAppChatWidget',
      fileName: 'widget',
      formats: ['iife']
    }
  }
});
```

### Step 3: Widget Components

**Widget.jsx** - Main component with:
- Floating chat button (bottom-right corner)
- Expandable chat window
- Message list with auto-scroll
- Input field with send button
- Polling for new messages (every 5 seconds when open)

**useChat.js** - Custom hook for:
- Conversation initialization
- Sending messages
- Fetching messages
- Managing chat state (open/closed, loading, errors)

### Step 4: Development Setup

**Local development:**
```bash
cd widget
npm install
npm run dev
# Widget served at http://localhost:5173/src/main.jsx
```

**Test locally with index.html:**
```html
<!DOCTYPE html>
<html>
<head><title>Widget Test</title></head>
<body>
  <h1>Test Page</h1>
  <script>
    window.SHOPAPPCHAT_CONFIG = {
      shopId: "test_shop_123",
      shopName: "Test Store",
      apiUrl: "https://shopappchat.gadget.app"
    };
  </script>
  <script type="module" src="http://localhost:5173/src/main.jsx"></script>
</body>
</html>
```

### Step 5: Production Deployment

Deploy to Vercel/Netlify when ready:
1. Push widget folder to GitHub
2. Connect to Vercel/Netlify
3. Build command: `npm run build`
4. Output directory: `dist`
5. Production URL: `https://your-widget.vercel.app/widget.js`

## Files to Create

### Gadget Backend (api/routes/)
| File | Purpose |
|------|---------|
| `POST-widget-init.js` | Initialize/get conversation |
| `POST-widget-message.js` | Send message |
| `GET-widget-messages-[conversationId].js` | Fetch messages |

### Widget Project (widget/)
| File | Purpose |
|------|---------|
| `package.json` | Dependencies |
| `vite.config.js` | Build config |
| `index.html` | Local test page |
| `src/main.jsx` | Entry point |
| `src/Widget.jsx` | Main component |
| `src/components/ChatButton.jsx` | Floating button |
| `src/components/ChatWindow.jsx` | Chat panel |
| `src/components/MessageList.jsx` | Messages display |
| `src/components/MessageInput.jsx` | Text input |
| `src/hooks/useChat.js` | Chat logic |
| `src/styles.css` | Widget styles |

## Verification

1. Start Gadget dev server (for API routes)
2. Run `npm run dev` in widget folder
3. Open `index.html` in browser
4. Test: conversation creates on load
5. Test: can send messages
6. Test: messages appear in list
7. Build: `npm run build` produces `dist/widget.js`

## Example Usage (Production)

```html
<script>
  window.SHOPAPPCHAT_CONFIG = {
    shopId: "{{ shop.id }}",
    shopName: "{{ shop.name }}",
    apiUrl: "https://shopappchat.gadget.app"
  };
</script>
<script src="https://your-widget.vercel.app/widget.js" async></script>
```
