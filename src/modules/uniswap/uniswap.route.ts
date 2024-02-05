import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  getPairAddressHandler,
  addSwapEventHandler,
  getSwapEvents,
} from './uniswap.controller';
import { addSwapEventSchema } from './uniswap.schema';

export const uniswapRoute = (
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) => {
  app.get('/pair', getPairAddressHandler);
  app.post(
    '/addSwapEvent',
    { schema: addSwapEventSchema },
    addSwapEventHandler,
  );
  app.get('/swapEvents', getSwapEvents);
  done();
};
