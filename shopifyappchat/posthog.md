# Building an Analytics SDK (PostHog-style)

This document outlines how to build a third-party analytics SDK similar to PostHog, Segment, or Mixpanel.

## How PostHog Works

### 1. Initialize Once with Project Key

```js
posthog.init('YOUR_PROJECT_API_KEY', {
  api_host: 'https://app.posthog.com'  // or your self-hosted URL
});
```

### 2. Capture Events Anywhere

```js
posthog.capture('Settings page viewed');
posthog.capture('Settings saved', { tab: 'general', changedFields: 5 });
```

---

## Building Your Own Analytics SDK

### Core SDK Implementation

```js
class Analytics {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.endpoint = options.apiHost || 'https://your-analytics.com';
    this.queue = [];
    this.flushInterval = setInterval(() => this.flush(), 5000);
  }

  capture(event, properties = {}) {
    this.queue.push({
      event,
      properties,
      timestamp: new Date().toISOString(),
      distinctId: this.getDistinctId(),
    });

    // Flush immediately if queue gets large
    if (this.queue.length >= 10) this.flush();
  }

  flush() {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    const payload = JSON.stringify({
      api_key: this.apiKey,
      batch: events
    });

    // Use sendBeacon for reliability (survives page close)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${this.endpoint}/batch`, payload);
    } else {
      fetch(`${this.endpoint}/batch`, {
        method: 'POST',
        body: payload,
        keepalive: true
      });
    }
  }

  getDistinctId() {
    // Get or create a unique user ID
    let id = localStorage.getItem('analytics_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('analytics_id', id);
    }
    return id;
  }

  // Identify a user (link anonymous ID to real user)
  identify(userId, traits = {}) {
    this.userId = userId;
    this.capture('$identify', { userId, ...traits });
  }

  // Track page views
  page(pageName, properties = {}) {
    this.capture('$pageview', {
      pageName,
      url: window.location.href,
      ...properties
    });
  }

  // Clean up on unmount
  shutdown() {
    clearInterval(this.flushInterval);
    this.flush();
  }
}

export { Analytics };
```

---

## Usage in Your App

### Initialize (in App.jsx or root)

```js
import { Analytics } from 'your-analytics-package';

window.analytics = new Analytics('osp-project-key', {
  apiHost: 'https://analytics.ordersplitpro.com'
});
```

### Capture Events

```js
// Simple event
analytics.capture('Settings page viewed');

// Event with properties
analytics.capture('Settings saved', {
  tab: 'general',
  changedFields: 5,
  shop: shopId
});

// Page view
analytics.page('Settings');

// Identify user
analytics.identify(userId, {
  email: user.email,
  plan: 'premium'
});
```

### Migration from api.fetch

Replace this:
```js
api.fetch(`/analytics/adminevent?event=Settings page viewed`);
```

With this:
```js
analytics.capture('Settings page viewed', { shop: shopId });
```

---

## Server-Side: Receiving Events

Your analytics service endpoint receives batched events:

### Request Payload

```json
{
  "api_key": "osp-project-key",
  "batch": [
    {
      "event": "Settings page viewed",
      "properties": { "shop": "shop_123" },
      "timestamp": "2026-03-22T10:30:00.000Z",
      "distinctId": "550e8400-e29b-41d4-a716-446655440000"
    },
    {
      "event": "Settings saved",
      "properties": { "tab": "general", "changedFields": 5 },
      "timestamp": "2026-03-22T10:30:15.000Z",
      "distinctId": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
```

### Example Endpoint (Gadget Route)

```js
// api/routes/POST-batch.js
export default async function route({ request, reply, api, logger }) {
  const { api_key, batch } = request.body;

  // Validate API key
  const project = await api.analyticsProject.findFirst({
    filter: { apiKey: { equals: api_key } }
  });

  if (!project) {
    return reply.status(401).send({ error: 'Invalid API key' });
  }

  // Store events
  for (const event of batch) {
    await api.analyticsEvent.create({
      projectId: project.id,
      event: event.event,
      properties: event.properties,
      distinctId: event.distinctId,
      timestamp: event.timestamp
    });
  }

  await reply.send({ success: true, received: batch.length });
}
```

---

## Key Features to Consider

### 1. Batching
Events are queued and sent in batches to reduce network requests.

### 2. Reliability
Using `sendBeacon` ensures events are sent even if the user closes the page.

### 3. Automatic Properties
Automatically capture useful context:

```js
capture(event, properties = {}) {
  this.queue.push({
    event,
    properties: {
      ...properties,
      $current_url: window.location.href,
      $referrer: document.referrer,
      $screen_width: window.innerWidth,
      $screen_height: window.innerHeight,
      $user_agent: navigator.userAgent,
    },
    timestamp: new Date().toISOString(),
    distinctId: this.getDistinctId(),
  });
}
```

### 4. Session Tracking

```js
getSessionId() {
  let sessionId = sessionStorage.getItem('analytics_session');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session', sessionId);
  }
  return sessionId;
}
```

### 5. Opt-out Support

```js
optOut() {
  this.optedOut = true;
  localStorage.setItem('analytics_opt_out', 'true');
}

capture(event, properties = {}) {
  if (this.optedOut) return;
  // ... rest of capture logic
}
```

---

## Publishing as NPM Package

### Package Structure

```
your-analytics-sdk/
├── src/
│   └── index.js
├── dist/
│   ├── index.js      (CommonJS)
│   └── index.mjs     (ESM)
├── package.json
└── README.md
```

### package.json

```json
{
  "name": "@yourcompany/analytics",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts"
  }
}
```

