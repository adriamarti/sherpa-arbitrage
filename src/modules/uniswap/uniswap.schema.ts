import { Type, Static } from '@sinclair/typebox';

export const getPairSchema = {
  tags: ['uniswap'],
  description: 'Get a uniswap pair address',
  query: Type.Object({
    token0: Type.String(),
    token1: Type.String(),
  }),
  response: {
    200: {
      address: Type.String(),
      token1: Type.String(),
      token2: Type.String(),
    },
  },
};

export const addSwapEventSchema = {
  tags: ['uniswap'],
  description: 'Add a swap event listener for a uniswap pair',
  body: Type.Object({
    pair: Type.String(),
  }),
  response: {
    201: { uniswapAddress: Type.String(), provider: Type.String() },
  },
};

export type GetPairQuery = Static<typeof getPairSchema.query>;
export type AddSwapEventBody = Static<typeof addSwapEventSchema.body>;
