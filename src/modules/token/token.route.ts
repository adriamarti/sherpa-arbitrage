import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  createTokenHandler,
  getAllTokensHandler,
  getTokenHandler,
  updateTokenHandler,
  deleteTokenHandler,
} from './token.controller';
import {
  createTokenSchema,
  getTokenSchema,
  updateTokenSchema,
  deleteTokenSchema,
} from './token.schema';

export const tokenRoute = (
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) => {
  app.post('/', { schema: createTokenSchema }, createTokenHandler);
  app.get('/', getAllTokensHandler);
  app.get('/:tokenId', { schema: getTokenSchema }, getTokenHandler);
  app.put('/:tokenId', { schema: updateTokenSchema }, updateTokenHandler);
  app.delete('/:tokenId', { schema: deleteTokenSchema }, deleteTokenHandler);
  done();
};
