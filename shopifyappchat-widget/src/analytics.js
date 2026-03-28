// Set stub IMMEDIATELY so calls never crash
window.shopAnalytics = window.shopAnalytics || { track: () => {}, page: () => {}, identify: () => {}, flush: () => {} };

import { Client } from '@gadget-client/shopappchat';

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};
const config = getConfig();

let api;
try {
  api = new Client({
    environment: config.environment || 'development'
  });
} catch (err) {
  console.error('[ShopAppChat Analytics] Failed to init client:', err);
}

// Try to get shop domain directly from URL first
const params = new URLSearchParams(window.location.search);
let shopDomain = params.get('shop');
console.log('[ShopAppChat Analytics] Shop from URL:', shopDomain);

// Also listen for shop from bridge (in case we're in an iframe)
window.addEventListener('message', (e) => {
  if (e.data?.type === 'SHOPAPPCHAT_SHOP' && e.data.shop) {
    console.log('[ShopAppChat Analytics] Received shop from bridge:', e.data.shop);
    shopDomain = e.data.shop;
  }
});

// Request from parent if we're in an iframe and don't have shop yet
if (window.parent !== window && !shopDomain) {
  console.log('[ShopAppChat Analytics] Requesting shop from parent');
  window.parent.postMessage({ type: 'SHOPAPPCHAT_GET_SHOP' }, '*');
}

const getShopDomain = () => shopDomain;

if (config.orgSlug && api) {
  const getDistinctId = () => {
    const key = `osp_distinct_${config.orgSlug}`;
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  };

  const getSessionId = () => {
    const key = `osp_session_${config.orgSlug}`;
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  };

  let queue = [];
  let flushTimeout = null;

  const flush = async () => {
    if (queue.length === 0) return;

    const events = [...queue];
    queue = [];

    for (const e of events) {
      try {
        await api.trackEventsTWO({
          event: e.event,
          properties: e.properties,
          distinctId: e.distinctId,
          sessionId: e.sessionId,
          timestamp: e.timestamp,
          shopId: getShopDomain()
        });
      } catch (err) {
        console.warn('Analytics: failed to track event', err);
      }
    }
  };

  const track = (event, properties = {}) => {
    queue.push({
      event,
      properties: {
        ...properties,
        orgSlug: config.orgSlug,
        shopId: config.shopId,
        shopDomain: getShopDomain(),
        $url: window.location.href,
        $referrer: document.referrer
      },
      distinctId: getDistinctId(),
      sessionId: getSessionId(),
      timestamp: new Date().toISOString()
    });

    if (queue.length >= 10) {
      flush();
    } else if (!flushTimeout) {
      flushTimeout = setTimeout(() => {
        flush();
        flushTimeout = null;
      }, 5000);
    }
  };

  const page = (pageName, properties = {}) => {
    track('$pageview', { pageName, ...properties });
  };

  const identify = (userId, traits = {}) => {
    track('$identify', { userId, ...traits });
  };

  window.addEventListener('beforeunload', flush);
  window.addEventListener('pagehide', flush);

  window.shopAnalytics = { track, page, identify, flush };

  if (config.autoTrackPageviews !== false) {
    page(document.title);
  }
}
