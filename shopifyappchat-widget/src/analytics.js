import { Client } from '@gadget-client/shopappchat';

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};

const config = getConfig();
const api = new Client({
  environment: config.environment || 'development'
});

const getShopDomain = () => {
  const match = window.location.pathname.match(/^\/store\/([^/]+)/);
  console.log("matched", match);
  console.log("match", match ? match[1] : null);
  return match ? match[1] : null;
};

// Log the full URL and shop param to see what's available
console.log('[ShopAppChat Analytics] URL:', window.location.href);
console.log('[ShopAppChat Analytics] Shop param:', new URLSearchParams(window.location.search).get('shop'));

// Set stub immediately so calls don't crash before full init
window.shopAnalytics = { track: () => { }, page: () => { }, identify: () => { }, flush: () => { } };

if (config.orgSlug) {
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
