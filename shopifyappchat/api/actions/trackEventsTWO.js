export const run = async ({ params, api, logger }) => {
  const { event, properties, distinctId, sessionId, timestamp } = params;

  logger.info("Analytics event received", { event });

  await api.analyticsFIVE.create({
    event,
    properties: properties || {},
    distinctId,
    sessionId,
    timestamp: timestamp ? new Date(timestamp) : new Date()
  });

  return { success: true };
};

export const params = {
  event: { type: "string" },
  properties: { type: "object", properties: {} },
  distinctId: { type: "string" },
  sessionId: { type: "string" },
  timestamp: { type: "string" }
};
