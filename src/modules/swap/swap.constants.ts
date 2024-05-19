import { Contract } from '@ethersproject/contracts';
import { AlchemyWebSocketProvider } from '@ethersproject/providers';

import { Pair } from '../pair/pair.model';

// export type SwapProtocol = 'uniSwap' | 'sushiSwap' | 'pancakeSwap';
export type SwapProtocol = 'uniSwap' | 'sushiSwap';

export type SwapProtocolEvent = {
  contract: Contract;
  pair: Pair;
  timeout: NodeJS.Timeout;
  provider: AlchemyWebSocketProvider;
};

export const swapFactoryAddress: Record<SwapProtocol, string> = {
  uniSwap: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  sushiSwap: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
  // pancakeSwap: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
};

export const swapEvent: Record<
  string,
  Record<SwapProtocol, SwapProtocolEvent>
> = {};

export const protocols: SwapProtocol[] = [
  'uniSwap',
  'sushiSwap',
  // 'pancakeSwap',
];
