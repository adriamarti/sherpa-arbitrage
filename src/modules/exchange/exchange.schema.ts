import { Type, Static } from '@sinclair/typebox';

const exchange = Type.Object({
  _id: Type.String(),
  name: Type.String(),
  shortId: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export const createExchangeSchema = {
  tags: ['exchange'],
  description: 'Creates a exchange resource',
  body: Type.Object({ name: Type.String() }),
  response: {
    201: exchange,
  },
};

export type CreateExchangeBody = Static<typeof createExchangeSchema.body>;
