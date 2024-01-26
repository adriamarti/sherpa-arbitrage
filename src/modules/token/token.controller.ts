import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

import { logger } from '../../utils/logger';
import {
  createToken,
  getAllTokens,
  getToken,
  updateToken,
  deleteToken,
  getTokenPrice,
} from './token.service';
import {
  CreateTokenBody,
  GetTokenParams,
  UpdateTokenBody,
  UpdateTokenParams,
  DeleteTokenParams,
} from './token.schema';

export const createTokenHandler = async (
  request: FastifyRequest<{ Body: CreateTokenBody }>,
  reply: FastifyReply,
) => {
  try {
    console.log({ requestBody: request.body });
    const token = await createToken(request.body);

    return reply.code(201).send(token);
  } catch (e) {
    logger.error(e, 'createTokenHandler: error create token');
    return reply.code(400).send({ message: 'Error create token' });
  }
};

export const getAllTokensHandler = async (_: unknown, reply: FastifyReply) => {
  try {
    const tokens = await getAllTokens();

    const tokensWithPrice = await Promise.all(
      tokens.map(async (token) => {
        try {
          const price = await getTokenPrice(token.symbol);

          return {
            _id: token._id,
            name: token.name,
            symbol: token.symbol,
            decimals: token.decimals,
            address: token.address,
            pair: token.pair,
            price,
          };
        } catch (e) {
          logger.error(
            e,
            `getAllTokensHandler: error fetching price for symbol ${token.symbol}:`,
          );
          return token;
        }
      }),
    );

    // @TODO should add pagination
    return reply
      .code(201)
      .send({ total: tokensWithPrice.length, page: tokensWithPrice });
  } catch (e) {
    logger.error(e, 'getAllTokensHandler: error getting all tokens');
    return reply.code(400).send({ message: 'Error get all tokens' });
  }
};

export const getTokenHandler = async (
  request: FastifyRequest<{ Params: GetTokenParams }>,
  reply: FastifyReply,
) => {
  try {
    const token = await getToken(new Types.ObjectId(request.params.tokenId));

    if (!token)
      return reply.code(404).send({
        message: `Token with ID ${request.params.tokenId} not found.`,
      });

    const price = await getTokenPrice(token.symbol);

    return reply.code(200).send({ ...token, price });
  } catch (e) {
    logger.error(e, 'getTokenHandler: error create token');
    return reply.code(400).send({ message: 'Error get token' });
  }
};

export const updateTokenHandler = async (
  request: FastifyRequest<{ Body: UpdateTokenBody; Params: UpdateTokenParams }>,
  reply: FastifyReply,
) => {
  try {
    const token = await updateToken(
      new Types.ObjectId(request.params.tokenId),
      request.body,
    );

    if (!token)
      return reply.code(404).send({
        message: `Token with ID ${request.params.tokenId} not found. No update performed.`,
      });

    return reply.code(200).send(token);
  } catch (e) {
    logger.error(e, 'updateTokenHandler: error update token');
    return reply.code(400).send({ message: 'Error update token' });
  }
};

export const deleteTokenHandler = async (
  request: FastifyRequest<{ Params: DeleteTokenParams }>,
  reply: FastifyReply,
) => {
  try {
    const token = await deleteToken(new Types.ObjectId(request.params.tokenId));

    if (!token)
      return reply.code(404).send({
        message: `Token with ID ${request.params.tokenId} not found. No deletion performed.`,
      });

    return reply.code(200).send(token);
  } catch (e) {
    logger.error(e, 'deleteTokenHandler: error delete token');
    return reply.code(400).send({ message: 'Error delete token' });
  }
};
