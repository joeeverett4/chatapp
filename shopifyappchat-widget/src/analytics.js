// Analytics SDK - standalone script for tracking events
(function () {
  const config = window.SHOPAPPCHAT_CONFIG || {};

  if (!config.orgSlug) {
    console.warn('Analytics: orgSlug not configured');
    return;
  }

  const API_URL = 'https://shopappchat--development.gadget.app/api/actions/trackEvent';

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

  const flush = () => {
    if (queue.length === 0) return;

    const events = [...queue];
    queue = [];

    const payload = JSON.stringify({
      batch: events.map(e => ({
        ...e,
        properties: {
          ...e.properties,
          orgSlug: config.orgSlug,
          shopId: config.shopId
        }
      }))
    });

    // Use sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon(API_URL, payload);
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      });
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
      sessionId: getSessionId(),
      timestamp: new Date().toISOString()
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
  window.addEventListener('beforeunload', flush);
  window.addEventListener('pagehide', flush);

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
})();
