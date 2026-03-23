(function() {
  "use strict";
  (function() {
    window.shopAnalytics = { track: () => {
    }, page: () => {
    }, identify: () => {
    }, flush: () => {
    } };
    if (!config.orgSlug) {
      console.warn("Analytics: orgSlug not configured");
      return;
    }
    const API_URL = "https://shopappchat--development.gadget.app/api/actions/trackEvent";
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
    const flush = () => {
      if (queue.length === 0) return;
      const events = [...queue];
      queue = [];
      const payload = JSON.stringify({
        batch: events.map((e) => ({
          ...e,
          properties: {
            ...e.properties,
            orgSlug: config.orgSlug,
            shopId: config.shopId
          }
        }))
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(API_URL, payload);
      } else {
        fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (queue.length >= 10) {
        flush();
      } else if (!flushTimeout) {
        flushTimeout = setTimeout(() => {
          flush();
          flushTimeout = null;
        }, 5e3);
      }
    };
    const page = (pageName, properties = {}) => {
      track("$pageview", { pageName, ...properties });
    };
    const identify = (userId, traits = {}) => {
      track("$identify", { userId, ...traits });
    };
    window.addEventListener("beforeunload", flush);
    window.addEventListener("pagehide", flush);
    window.shopAnalytics = {
      track,
      page,
      identify,
      flush
    };
    if (config.autoTrackPageviews !== false) {
      page(document.title);
    }
  })();
})();
