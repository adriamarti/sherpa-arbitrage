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
  uniswapV2Address: Type.Optional(Type.String()),
  swapEvent: Type.Optional(
    Type.Object({
      uniswapV2: Type.Optional(Type.Boolean()),
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
    uniswapV2Address: Type.Optional(Type.String()),
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

export const updatePairSchema = {
  tags: ['pair'],
  description: 'Update a pair resource',
  params: Type.Object({ pairId: Type.String() }),
  body: Type.Object({
    token0: Type.String(),
    token1: Type.String(),
    uniswapV2Address: Type.Optional(Type.String()),
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
