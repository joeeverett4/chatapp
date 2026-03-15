# Frontend Migration: Routes → Actions

## 1. Install the Gadget Client

```bash
npm install @gadget-client/shopappchat
```

## 2. Initialize the Client

```js
import { Client } from "@gadget-client/shopappchat";

const api = new Client();
```

## 3. Replace API Calls

### Initialize Widget

**Before (HTTP Route):**
```js
const response = await fetch("https://shopappchat--development.gadget.app/widget-init", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ shopId: "test_shop_123", shopName: "My Shop" })
});
const { conversationId, messages } = await response.json();
```

**After (Global Action):**
```js
const { conversationId, messages } = await api.initWidget({
  shopId: "test_shop_123",
  shopName: "My Shop",
  orgSlug: "upsell-app"  // Your organization's unique slug
});
```

---

### Get Messages

**Before (HTTP Route):**
```js
const response = await fetch(
  `https://shopappchat--development.gadget.app/widget-messages/${conversationId}?shopId=test_shop_123`
);
const { messages, status } = await response.json();
```

**After (Global Action):**
```js
const { messages, status } = await api.getWidgetMessages({
  conversationId: "1",
  shopId: "test_shop_123"
});
```

---

### Send Message

**Before (HTTP Route):**
```js
const response = await fetch("https://shopappchat--development.gadget.app/widget-message", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ conversationId: "1", content: "Hello!", shopId: "test_shop_123" })
});
const { message } = await response.json();
```

**After (Global Action):**
```js
const { message } = await api.sendWidgetMessage({
  conversationId: "1",
  content: "Hello!",
  shopId: "test_shop_123"
});
```

## 4. Error Handling

Actions throw errors instead of returning HTTP status codes:

```js
try {
  const result = await api.initWidget({ shopId: "test_shop_123" });
} catch (error) {
  console.error("Failed:", error.message);
}
```

## 5. Environment

For production, the client automatically uses the production environment. To explicitly set it:

```js
const api = new Client({ environment: "development" }); // or "production"
```
