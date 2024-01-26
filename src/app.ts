import { config } from './utils/config';
import { createServer } from './utils/createServer';
import { connectToDb, disconnectFromDb } from './utils/db';
import { logger } from './utils/logger';

const signals = ['SIGINT', 'SIGTERM', 'SIGHUP'] as const;

const gracefulShutdown = async ({
  signal,
  server,
}: {
  signal: (typeof signals)[number];
  server: Awaited<ReturnType<typeof createServer>>;
}) => {
  logger.info(`Got signal ${signal}. Shutdown Server.`);
  await server.close();

  await disconnectFromDb();

  process.exit(0);
};

const startServer = async () => {
  const server = await createServer();

  server.listen({
    port: config.PORT,
    host: config.HOST,
  });

  await connectToDb();

  for (let i = 0; i < signals.length; i++) {
    process.on(signals[i], () =>
      gracefulShutdown({
        signal: signals[i],
        server,
      }),
    );
  }

  logger.info(`App is listening on ${config.HOST}::${config.PORT}`);
};

// Start App
startServer();
