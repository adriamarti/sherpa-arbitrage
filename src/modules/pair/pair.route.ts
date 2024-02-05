import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import {
  createPairHandler,
  getAllPairsHandler,
  getPairHandler,
  updatePairHandler,
  deletePairHandler,
} from './pair.controller';
import {
  createPairSchema,
  getPairSchema,
  updatePairSchema,
  deletePairSchema,
} from './pair.schema';

export const pairRoute = (
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) => {
  app.post('/', { schema: createPairSchema }, createPairHandler);
  app.get('/', getAllPairsHandler);
  app.get('/:pairId', { schema: getPairSchema }, getPairHandler);
  app.put('/:pairId', { schema: updatePairSchema }, updatePairHandler);
  app.delete('/:pairId', { schema: deletePairSchema }, deletePairHandler);
  done();
};
