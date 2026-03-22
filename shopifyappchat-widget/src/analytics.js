// Define shopAnalytics immediately before any imports
const queue = [];
let flushTimeout = null;
let api = null;
let Client = null;

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};

const getDistinctId = () => {
  const config = getConfig();
  const key = `osp_distinct_${config.orgSlug || 'default'}`;
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
};

const getSessionId = () => {
  const config = getConfig();
  const key = `osp_session_${config.orgSlug || 'default'}`;
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
};

const ensureClient = async () => {
  if (api) return api;
  const config = getConfig();
  if (!config.orgSlug) return null;

  if (!Client) {
    const module = await import('@gadget-client/shopappchat');
    Client = module.Client;
  }

  api = new Client({
    environment: config.environment || 'development'
  });
  return api;
};

const flush = async () => {
  if (queue.length === 0) return;

  const client = await ensureClient();
  if (!client) return;

  const config = getConfig();
  const events = [...queue];
  queue.length = 0;

  for (const e of events) {
    try {
      await client.trackEvent({
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

// Set globally FIRST
window.shopAnalytics = { track, page, identify, flush };

// Then set up listeners and auto-track
window.addEventListener('beforeunload', () => flush());
window.addEventListener('pagehide', () => flush());

const config = getConfig();
if (config.orgSlug && config.autoTrackPageviews !== false) {
  page(document.title);
}
