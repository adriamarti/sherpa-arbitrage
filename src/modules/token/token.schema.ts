import { Type, Static } from '@sinclair/typebox';

export const token = Type.Object({
  _id: Type.String(),
  name: Type.String(),
  symbol: Type.String(),
  decimals: Type.Number(),
  address: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  price: Type.Optional(Type.Number()),
  pairs: Type.Optional(Type.Array(Type.String())),
});

export const createTokenSchema = {
  tags: ['token'],
  description: 'Creates a token resource',
  body: Type.Object({
    name: Type.String(),
    symbol: Type.String(),
    decimals: Type.Number(),
    address: Type.String(),
  }),
  response: {
    201: token,
  },
};

export const getTokenSchema = {
  tags: ['token'],
  description: 'Get a token resource',
  params: Type.Object({ tokenId: Type.String() }),
  response: {
    200: token,
  },
};

export const updateTokenSchema = {
  tags: ['token'],
  description: 'Update a token resource',
  params: Type.Object({ tokenId: Type.String() }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    symbol: Type.Optional(Type.String()),
    decimals: Type.Optional(Type.Number()),
    address: Type.Optional(Type.String()),
  }),
  response: {
    200: token,
  },
};

export const deleteTokenSchema = {
  tags: ['token'],
  description: 'Delete a token resource',
  params: Type.Object({ tokenId: Type.String() }),
  response: {
    200: token,
  },
};

export type CreateTokenBody = Static<typeof createTokenSchema.body>;
export type GetTokenParams = Static<typeof getTokenSchema.params>;
export type UpdateTokenBody = Static<typeof updateTokenSchema.body>;
export type UpdateTokenParams = Static<typeof updateTokenSchema.params>;
export type DeleteTokenParams = Static<typeof getTokenSchema.params>;
