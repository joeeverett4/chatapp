import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

/**
 * Pusher auth action for presence channels
 * Called by widget when subscribing to presence-* channels
 */
export const run = async ({ params, api, logger }) => {
  const { socketId, channelName, email, conversationId } = params;

  logger.info({ socketId, channelName, email, conversationId }, "Pusher auth request");

  if (!socketId || !channelName) {
    throw new Error("Missing socketId or channelName");
  }

  // For presence channels, provide user info
  const presenceData = {
    user_id: email || `anonymous-${socketId}`,
    user_info: {
      email,
      conversationId,
      type: "customer"
    }
  };

  const auth = pusher.authorizeChannel(socketId, channelName, presenceData);

  logger.info({ auth }, "Pusher auth response");

  return auth;
};

export const params = {
  socketId: { type: "string" },
  channelName: { type: "string" },
  email: { type: "string" },
  conversationId: { type: "string" }
};
