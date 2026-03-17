export default async function route({ request, reply, api, logger }) {
  const { messageId } = request.query;

  if (messageId) {
    try {
      await api.markEmailRead({ messageId });
    } catch (err) {
      logger.error("Failed to mark email as read", { error: err.message });
    }
  }

  // Return 1x1 transparent GIF
  reply.header('Content-Type', 'image/gif');
  reply.header('Cache-Control', 'no-store, no-cache, must-revalidate');
  reply.header('Access-Control-Allow-Origin', '*');

  // Base64 encoded 1x1 transparent GIF
  const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  return reply.send(pixel);
}
