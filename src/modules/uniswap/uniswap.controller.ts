import { FastifyReply, FastifyRequest } from 'fastify';
import { BigNumber } from '@ethersproject/bignumber';
import { Types } from 'mongoose';

import { logger } from '../../utils/logger';
import { getToken } from '../token/token.service';
import { getPair } from '../pair/pair.service';
import { GetPairQuery, AddSwapEventBody } from './uniswap.schema';
import { getPairAddress, addSwapEvent, swapEvent } from './uniswap.service';

export const getPairAddressHandler = async (
  request: FastifyRequest<{ Querystring: GetPairQuery }>,
  reply: FastifyReply,
) => {
  try {
    const token0 = await getToken(new Types.ObjectId(request.query.token0));
    const token1 = await getToken(new Types.ObjectId(request.query.token1));

    if (!token0 || !token1)
      return reply.code(404).send({
        message: `Token with ID ${request.query.token0} or token with ID ${request.query.token1} not found.`,
      });

    const pairAddress = await getPairAddress(token0.address, token1.address);

    return reply.code(200).send({ pairAddress });
  } catch (e) {
    logger.error(e, 'getPairAddressHandler: error get pair address');
    return reply.code(400).send({ message: 'Error get pair address' });
  }
};

export const addSwapEventHandler = async (
  request: FastifyRequest<{ Body: AddSwapEventBody }>,
  reply: FastifyReply,
) => {
  try {
    const pair = await getPair(new Types.ObjectId(request.body.pair));

    if (!pair)
      return reply.code(404).send({
        message: `Pair with ID ${request.body.pair} not found.`,
      });

    if (BigNumber.from(pair.uniswapV2Address).isZero())
      return reply.code(400).send({
        message: `There is no Uniswap pair address for Pair with ID ${request.body.pair}`,
      });

    addSwapEvent(
      (pair.token0 as any).address,
      (pair.token1 as any).address,
      pair.uniswapV2Address,
    );

    return reply
      .code(200)
      .send({ uniswapAddress: pair.uniswapV2Address, provider: 'Alchemy' });
  } catch (e) {
    logger.error(e, 'getPairAddressHandler: error get pair address');
    return reply.code(400).send({ message: 'Error get pair address' });
  }
};

export const getSwapEvents = async (_: unknown, reply: FastifyReply) => {
  const swapEvents = Object.keys(swapEvent).map((key) => ({
    key,
    token0: swapEvent[key].token0,
    token1: swapEvent[key].token1,
    provider: 'Alchemy',
  }));

  // @TODO should add pagination
  return reply.code(200).send({ total: swapEvents.length, page: swapEvents });
};
