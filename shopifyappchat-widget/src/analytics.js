import { Client } from '@gadget-client/shopappchat';

const getConfig = () => window.SHOPAPPCHAT_CONFIG || {};

const config = getConfig();

if (!config.orgSlug) {
  console.warn('Analytics: orgSlug not configured');
} else {
  const api = new Client({
    environment: config.environment || 'development'
  });

  // Get or create unique user ID
  const getDistinctId = () => {
    const key = `osp_distinct_${config.orgSlug}`;
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  };

  // Get or create session ID
  const getSessionId = () => {
    const key = `osp_session_${config.orgSlug}`;
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  };

  // Event queue for batching
  let queue = [];
  let flushTimeout = null;

  const flush = async () => {
    if (queue.length === 0) return;

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

    // Flush after 5 seconds or when queue hits 10
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

  // Flush on page unload
  window.addEventListener('beforeunload', () => flush());
  window.addEventListener('pagehide', () => flush());

  // Expose globally
  window.shopAnalytics = {
    track,
    page,
    identify,
    flush
  };

  // Auto-track page view if configured
  if (config.autoTrackPageviews !== false) {
    page(document.title);
  }
}
