import { Client } from '@gadget-client/shopappchat';

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};

const config = getConfig();
const api = new Client({
  environment: config.environment || 'development'
});

console.log('Gadget client:', api);

const queue = [];
let flushTimeout = null;

const getDistinctId = () => {
  const key = `osp_distinct_${config.orgSlug || 'default'}`;
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
};

const getSessionId = () => {
  const key = `osp_session_${config.orgSlug || 'default'}`;
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
};

const flush = async () => {
  if (queue.length === 0) return;
  if (!config.orgSlug) return;

  const events = [...queue];
  queue.length = 0;

  for (const evt of events) {
    try {
      await api.trackEventsTWO({
        event: evt.eventName,
        properties: evt.properties,
        distinctId: evt.distinctId,
        sessionId: evt.sessionId
      });
    } catch (err) {
      console.warn('Analytics: failed to track event', err);
    }
  }
};

const track = (eventName, properties = {}) => {
  queue.push({
    eventName,
    properties: {
      ...properties,
      orgSlug: config.orgSlug,
      shopId: config.shopId,
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

window.shopAnalytics = { track, page, identify, flush };

if (config.orgSlug && config.autoTrackPageviews !== false) {
  page(document.title);
}
