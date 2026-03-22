export const run = async ({ params, api, logger }) => {
  const { event, properties, distinctId, sessionId } = params;

  if (!event) {
    throw new Error("event is required");
  }

  await api.analyticsEvent.create({
    event,
    properties: properties || {},
    distinctId: distinctId || null,
    sessionId: sessionId || null,
    timestamp: new Date()
  });

  logger.info("Event tracked", { event, distinctId });

  return { success: true };
};

export const params = {
  event: { type: "string" },
  properties: { type: "object" },
  distinctId: { type: "string" },
  sessionId: { type: "string" }
};
