import config from "config";
import { db } from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  try {
    await db.$connect();
    logger.info("Database connection connected");
    await db.$disconnect();
    logger.info("Database connection disconnected");
  } catch (error: any) {
    throw new Error(error.message);
  }
});
