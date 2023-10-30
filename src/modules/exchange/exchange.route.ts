import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { createExchangeHandler } from './exchange.controller';
import { createExchangeSchema } from './exchange.schema';

export const exchangeRoute = (
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) => {
  app.post('/', { schema: createExchangeSchema }, createExchangeHandler);
  done();
};
