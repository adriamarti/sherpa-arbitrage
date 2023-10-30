import { describe, it, vi, expect } from 'vitest';
import { nanoid } from 'nanoid';

import { createServer } from '../../../utils/createServer';
import * as ExchangeService from '../exchange.service';

describe('POST "/api/v1/exchange" route', () => {
  it('should call the createExchange service', async () => {
    const exchange = {
      _id: '1234',
      name: 'Sushishop',
      shortId: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const createExchangeSpy = vi.spyOn(ExchangeService, 'createExchange');
    expect(createExchangeSpy.getMockName()).toEqual('createExchange');

    createExchangeSpy.mockResolvedValue(exchange);

    const server = await createServer();
    await server.ready();

    const payload = {
      name: 'Sushishop',
    };

    const response = await server.inject({
      method: 'POST',
      url: '/api/v1/exchange',
      payload,
    });

    expect(response.json()).toEqual(exchange);
    expect(createExchangeSpy).toHaveBeenCalledWith(payload);
  });
});
