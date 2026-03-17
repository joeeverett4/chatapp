import { RouteHandler } from "gadget-server";
import fs from "fs";
import path from "path";

const route = async ({ request, reply }) => {
  // Read the widget file
  const widgetPath = path.join(process.cwd(), "api", "assets", "widget.iife.js");
  const widgetContent = fs.readFileSync(widgetPath, "utf-8");

  reply.header("Content-Type", "application/javascript");
  reply.header("Cache-Control", "public, max-age=3600");
  await reply.send(widgetContent);
};

route.options = {
  cors: {
    origin: true,
  },
};

export default route;
