import { api } from "../api";

// Get or create a unique user ID
const getDistinctId = () => {
  let id = localStorage.getItem("osp_distinct_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("osp_distinct_id", id);
  }
  return id;
};

// Get or create session ID (resets when browser closes)
const getSessionId = () => {
  let id = sessionStorage.getItem("osp_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("osp_session_id", id);
  }
  return id;
};

// Track an event
export const track = async (event, properties = {}) => {
  try {
    await api.trackEvent({
      event,
      properties,
      distinctId: getDistinctId(),
      sessionId: getSessionId()
    });
  } catch (err) {
    console.error("Failed to track event:", err);
  }
};

// Track a page view
export const page = async (pageName, properties = {}) => {
  await track("$pageview", {
    pageName,
    url: window.location.href,
    ...properties
  });
};

// Identify a user (link anonymous ID to real user)
export const identify = async (userId, traits = {}) => {
  await track("$identify", {
    userId,
    ...traits
  });
};
