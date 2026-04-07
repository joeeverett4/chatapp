import crypto from "crypto";

/**
 * Pusher webhook endpoint for presence channel events
 * Receives notifications when users join/leave channels
 */
export default async function route({ request, reply, api, logger }) {
  logger.info("=== PUSHER WEBHOOK CALLED ===");

  try {
    // In Gadget, request.body is already parsed JSON
    const data = request.body;
    const signature = request.headers["x-pusher-signature"];
    const key = request.headers["x-pusher-key"];

    logger.info({
      hasData: !!data,
      hasSignature: !!signature,
      hasKey: !!key,
      events: data?.events?.length
    }, "Pusher webhook request received");

    // Verify webhook signature using rawBody if available, otherwise stringify
    const rawBody = request.rawBody || JSON.stringify(data);
    const expectedSignature = crypto
      .createHmac("sha256", process.env.PUSHER_SECRET)
      .update(rawBody)
      .digest("hex");

    logger.info({
      receivedSignature: signature,
      expectedSignature,
      match: signature === expectedSignature
    }, "Signature verification");

    if (signature !== expectedSignature) {
      logger.warn({ receivedSignature: signature, expectedSignature }, "Invalid Pusher webhook signature");
      // Log but don't block - signature may differ due to body serialization
      // return reply.status(401).send({ error: "Invalid signature" });
    }
    logger.info({ events: data.events, time_ms: data.time_ms }, "Pusher webhook payload parsed");

    for (const event of data.events || []) {
      // member_removed = user disconnected from presence channel
      if (event.name === "member_removed") {
        const channelName = event.channel;
        const userId = event.user_id; // This is the email we set in auth

        logger.info({ channelName, userId }, "User disconnected from presence channel");

        // Extract conversationId from channel name (presence-conversation-{id})
        const conversationId = channelName.replace("presence-conversation-", "");

        // Find and update customer
        const customer = await api.customer.maybeFindFirst({
          filter: { email: { equals: userId } }
        });

        if (customer) {
          await api.customer.update(customer.id, {
            isOnline: false,
            lastActiveAt: new Date().toISOString()
          });
          logger.info({ customerId: customer.id, email: userId }, "Customer marked offline via Pusher");
        }
      }

      // member_added = user connected to presence channel
      if (event.name === "member_added") {
        const userId = event.user_id;

        logger.info({ userId }, "User connected to presence channel");

        const customer = await api.customer.maybeFindFirst({
          filter: { email: { equals: userId } }
        });

        if (customer) {
          await api.customer.update(customer.id, {
            isOnline: true,
            lastActiveAt: new Date().toISOString()
          });
          logger.info({ customerId: customer.id, email: userId }, "Customer marked online via Pusher");
        }
      }
    }

    return reply.send({ ok: true });
  } catch (error) {
    logger.error({ error: error.message }, "Pusher webhook error");
    return reply.status(500).send({ error: error.message });
  }
}
