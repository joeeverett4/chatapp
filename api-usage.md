# Calling Gadget Routes from External Apps

## Using fetch (Browser or Node 18+)

```js
const response = await fetch('https://shopappchat.gadget.app/hello');
const data = await response.json();
console.log(data);
```

## Using fetch (Node < 18)

```bash
npm install node-fetch
```

```js
import fetch from 'node-fetch';

const response = await fetch('https://shopappchat.gadget.app/hello');
const data = await response.json();
console.log(data);
```

## Track Event

**Endpoint:** `POST https://shopappchat.gadget.app/track`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| event | string | Yes | Event name |
| properties | object | No | Custom event properties |
| distinctId | string | No | Unique user identifier |
| sessionId | string | No | Session identifier |
| timestamp | string | No | ISO timestamp |
| shopId | string | No | Shop domain |

**Example:**

```js
await fetch('https://shopappchat.gadget.app/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event: 'Button clicked',
    properties: {
      buttonId: 'signup',
      page: '/pricing'
    },
    distinctId: 'user-123',
    sessionId: 'session-456',
    timestamp: new Date().toISOString(),
    shopId: 'shop.myshopify.com'
  })
});
```

**Response:**

```json
{ "success": true }
```
