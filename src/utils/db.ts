import mongoose from 'mongoose';
import { config } from './config';
import { logger } from './logger';

export const connectToDb = async () => {
  try {
    await mongoose.connect(config.DB_URL);
    logger.info('Connected to DB');
  } catch (e) {
    logger.error(e, 'connectToDb: failed to connect to DB');
    process.exit(1);
  }
};

export const disconnectFromDb = () => {
  return mongoose.connection.close();
};
