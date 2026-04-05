const route = async ({ request, reply, api, logger }) => {
  try {
    const { event, properties, distinctId, sessionId, timestamp, shopId } = request.body;

    console.log("event", event);
    console.log("properties", properties);
    console.log("distinctId", distinctId);
    console.log("sessionId", sessionId);
    console.log("timestamp", timestamp);
    console.log("shopId", shopId);

    if (!event) {
      await reply.status(400).send({ error: "event is required" });
      return;
    }

    await api.analyticsFIVE.create({
      event,
      properties: properties || {},
      distinctId,
      sessionId,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      shopId
    });

    await reply.status(200).send({ success: true });
  } catch (error) {
    logger.error({ error }, "Failed to track event");
    await reply.status(500).send({ error: "Internal server error" });
  }
};

route.options = {
  cors: {
    origin: true,
  },
};

export default route;
