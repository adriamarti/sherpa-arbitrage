import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

import { logger } from '../../utils/logger';
import { getToken } from '../token/token.service';
import {
  getSwapPairAddresses,
  startSwapEventListener,
} from '../swap/swap.service';
import { swapEvent } from '../swap/swap.constants';
import {
  createPair,
  getAllPairs,
  getPair,
  updatePair,
  deletePair,
} from './pair.service';
import {
  CreatePairBody,
  GetPairParams,
  UpdatePairBody,
  UpdatePairParams,
  DeletePairParams,
  StartPairSwapParams,
} from './pair.schema';
import { addPairToken } from '../token/token.service';
import { Token } from '../token/token.model';

export const createPairHandler = async (
  request: FastifyRequest<{ Body: CreatePairBody }>,
  reply: FastifyReply,
) => {
  try {
    // Token0 and Token1 could be different at the contract
    const token0 = await getToken(new Types.ObjectId(request.body.token0));
    const token1 = await getToken(new Types.ObjectId(request.body.token1));

    if (!token0 || !token1)
      return reply.code(404).send({
        message: `Token with ID ${request.body.token0} or token with ID ${request.body.token1} not found.`,
      });

    const swapPairAddresses = await getSwapPairAddresses(token0, token1);

    // Token0 and Token1 could be different at the contract
    const pair = await createPair({
      token0: [token0, token1].find(
        ({ address }: Token) => address === swapPairAddresses.token0,
      )?._id,
      token1: [token0, token1].find(
        ({ address }: Token) => address === swapPairAddresses.token1,
      )?._id,
      uniSwap: swapPairAddresses.uniSwap,
      sushiSwap: swapPairAddresses.sushiSwap,
      // pancakeSwap: swapPairAddresses.pancakeSwap,
    });

    await addPairToken(token0._id, pair._id);
    await addPairToken(token1._id, pair._id);

    return reply.code(201).send(pair);
  } catch (e) {
    logger.error(e, 'createPairHandler: error create pair');
    return reply.code(400).send({ message: 'Error create pair' });
  }
};

export const getAllPairsHandler = async (_: unknown, reply: FastifyReply) => {
  try {
    const pairs = await getAllPairs();
    return reply.code(200).send({
      total: pairs.length,
      page: pairs.map((pair) => ({
        ...pair,
        swapEvent: swapEvent[pair._id],
      })),
    });
  } catch (e) {
    logger.error(e, 'getAllPairsHandler: error getting all pairs');
    return reply.code(400).send({ message: 'Error get all pairs' });
  }
};

export const getPairHandler = async (
  request: FastifyRequest<{ Params: GetPairParams }>,
  reply: FastifyReply,
) => {
  try {
    const pair = await getPair(new Types.ObjectId(request.params.pairId));

    if (!pair)
      return reply.code(404).send({
        message: `Pair with ID ${request.params.pairId} not found.`,
      });

    return reply.code(200).send({
      ...pair,
      swapEvent: swapEvent[pair._id],
    });
  } catch (e) {
    logger.error(e, 'getPairHandler: error create pair');
    return reply.code(400).send({ message: 'Error get pair' });
  }
};

export const updatePairHandler = async (
  request: FastifyRequest<{ Body: UpdatePairBody; Params: UpdatePairParams }>,
  reply: FastifyReply,
) => {
  try {
    const pair = await updatePair(
      new Types.ObjectId(request.params.pairId),
      request.body,
    );

    if (!pair)
      return reply.code(404).send({
        message: `Pair with ID ${request.params.pairId} not found. No update performed.`,
      });

    return reply.code(200).send(pair);
  } catch (e) {
    logger.error(e, 'updatePairHandler: error update pair');
    return reply.code(400).send({ message: 'Error update pair' });
  }
};

export const deletePairHandler = async (
  request: FastifyRequest<{ Params: DeletePairParams }>,
  reply: FastifyReply,
) => {
  try {
    const pair = await deletePair(new Types.ObjectId(request.params.pairId));

    if (!pair)
      return reply.code(404).send({
        message: `Pair with ID ${request.params.pairId} not found. No deletion performed.`,
      });

    return reply.code(200).send(pair);
  } catch (e) {
    logger.error(e, 'deletePairHandler: error delete pair');
    return reply.code(400).send({ message: 'Error delete pair' });
  }
};

export const startPairSwapHandler = async (
  request: FastifyRequest<{ Params: StartPairSwapParams }>,
  reply: FastifyReply,
) => {
  try {
    const pair = await getPair(new Types.ObjectId(request.params.pairId));

    if (!pair)
      return reply.code(404).send({
        message: `Pair with ID ${request.params.pairId} not found.`,
      });

    startSwapEventListener(pair);

    return reply.code(200).send({
      ...pair,
      swapEvent: swapEvent[pair._id],
    });
  } catch (e) {
    logger.error(e, 'getPairHandler: error create pair');
    return reply.code(400).send({ message: 'Error get pair' });
  }
};
