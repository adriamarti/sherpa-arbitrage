import { Type, Static } from '@sinclair/typebox';

export const pair = Type.Object({
  _id: Type.String(),
  token0: Type.Object({
    _id: Type.String(),
    name: Type.String(),
    symbol: Type.String(),
    decimals: Type.Number(),
    address: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    price: Type.Optional(Type.Number()),
  }),
  token1: Type.Object({
    _id: Type.String(),
    name: Type.String(),
    symbol: Type.String(),
    decimals: Type.Number(),
    address: Type.String(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    price: Type.Optional(Type.Number()),
  }),
  uniSwap: Type.Optional(Type.String()),
  sushiSwap: Type.Optional(Type.String()),
  // pancakeSwap: Type.Optional(Type.String()),
  swapEvent: Type.Optional(
    Type.Object({
      uniSwap: Type.Optional(Type.Boolean()),
      sushiSwap: Type.Optional(Type.Boolean()),
      // pancakeSwap: Type.Optional(Type.Boolean()),
    }),
  ),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export const createPairSchema = {
  tags: ['pair'],
  description: 'Creates a pair resource',
  body: Type.Object({
    token0: Type.String(),
    token1: Type.String(),
  }),
  response: {
    201: pair,
  },
};

export const getPairSchema = {
  tags: ['pair'],
  description: 'Get a pair resource',
  params: Type.Object({ pairId: Type.String() }),
  response: {
    200: pair,
  },
};

export const startPairSwapSchema = {
  tags: ['pair'],
  description: 'Start a pair swap event listeners',
  params: Type.Object({ pairId: Type.String() }),
  response: {
    200: pair,
  },
};

export const updatePairSchema = {
  tags: ['pair'],
  description: 'Update a pair resource',
  params: Type.Object({ pairId: Type.String() }),
  body: Type.Object({
    token0: Type.String(),
    token1: Type.String(),
    uniSwap: Type.Optional(Type.String()),
    sushiSwap: Type.Optional(Type.String()),
    // pancakeSwap: Type.Optional(Type.String()),
  }),
  response: {
    200: pair,
  },
};

export const deletePairSchema = {
  tags: ['pair'],
  description: 'Delete a pair resource',
  params: Type.Object({ pairId: Type.String() }),
  response: {
    200: pair,
  },
};

export type CreatePairBody = Static<typeof createPairSchema.body>;
export type GetPairParams = Static<typeof getPairSchema.params>;
export type UpdatePairBody = Static<typeof updatePairSchema.body>;
export type UpdatePairParams = Static<typeof updatePairSchema.params>;
export type DeletePairParams = Static<typeof deletePairSchema.params>;
export type StartPairSwapParams = Static<typeof startPairSwapSchema.params>;
