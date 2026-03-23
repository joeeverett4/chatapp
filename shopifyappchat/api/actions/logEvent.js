/** @type { ActionRun } */
export const run = async ({ params, logger }) => {
  if (!params.event) {
    throw new Error("event param is required");
  }

  logger.info({ params }, "received params");

  return { success: true };
};

export const params = {
  event: { type: "string" },
  properties: {
    type: "object",
    additionalProperties: true,
  },
  distinctId: { type: "string" },
  sessionId: { type: "string" },
};
