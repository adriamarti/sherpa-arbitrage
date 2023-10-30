import { FastifyReply, FastifyRequest } from 'fastify';

import { logger } from '../../utils/logger';
import { createExchange } from './exchange.service';
import { CreateExchangeBody } from './exchange.schema';

export const createExchangeHandler = async (
  request: FastifyRequest<{ Body: CreateExchangeBody }>,
  reply: FastifyReply,
) => {
  try {
    const exchange = await createExchange(request.body);
    return reply.code(201).send(exchange);
  } catch (e) {
    logger.error(e, 'createExchangeHandler: error create exchange');
    return reply.code(400).send({ message: 'Error creating exchange' });
  }
};
