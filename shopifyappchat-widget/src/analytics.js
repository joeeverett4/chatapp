import { Client } from '@gadget-client/shopappchat';

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};

let api = null;
let queue = [];
let flushTimeout = null;

const init = () => {
  const config = getConfig();
  if (!config.orgSlug) return false;

  if (!api) {
    api = new Client({
      environment: config.environment || 'development'
    });
  }
  return true;
};

const getDistinctId = () => {
  const config = getConfig();
  const key = `osp_distinct_${config.orgSlug}`;
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
};

const getSessionId = () => {
  const config = getConfig();
  const key = `osp_session_${config.orgSlug}`;
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
};

const flush = async () => {
  if (queue.length === 0) return;
  if (!init()) return;

  const config = getConfig();
  const events = [...queue];
  queue = [];

  for (const e of events) {
    try {
      await api.trackEvent({
        event: e.event,
        properties: {
          ...e.properties,
          orgSlug: config.orgSlug,
          shopId: config.shopId
        },
        distinctId: e.distinctId,
        sessionId: e.sessionId
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
      $url: window.location.href,
      $referrer: document.referrer
    },
    distinctId: getDistinctId(),
    sessionId: getSessionId()
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

window.addEventListener('beforeunload', () => flush());
window.addEventListener('pagehide', () => flush());

// Always expose globally - immediately
window.shopAnalytics = {
  track,
  page,
  identify,
  flush
};

// Auto-track pageview
const config = getConfig();
if (config.orgSlug && config.autoTrackPageviews !== false) {
  page(document.title);
}
