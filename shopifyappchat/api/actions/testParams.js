/** @type { ActionRun } */
export const run = async ({ params, logger }) => {
  logger.info({ params }, "received params");
  logger.info({ testString: params.testString }, "testString value");
  return { received: params.testString };
};

export const params = {
  testString: { type: "string" },
};
