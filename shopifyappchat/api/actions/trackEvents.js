export const run = async ({ params, api, logger }) => {
  const { batch } = params;

  if (!batch || !Array.isArray(batch)) {
    throw new Error("batch is required");
  }

  logger.info("Analytics batch received", { count: batch.length });

  for (const event of batch) {
    await api.analyticsEvent.create({
      event: event.event,
      properties: event.properties || {},
      distinctId: event.distinctId,
      sessionId: event.sessionId,
      timestamp: event.timestamp ? new Date(event.timestamp) : new Date()
    });
  }

  return { success: true, received: batch.length };
};

export const params = {
  batch: {
    type: "array",
    items: {
      type: "object",
      properties: {
        event: { type: "string" },
        properties: { type: "object", properties: {} },
        distinctId: { type: "string" },
        sessionId: { type: "string" },
        timestamp: { type: "string" }
      }
    }
  }
};
