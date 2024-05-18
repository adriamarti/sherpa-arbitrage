export type SwapProtocol = 'uniSwap' | 'sushiSwap';

export const swapFactoryAddress: Record<SwapProtocol, string> = {
  uniSwap: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  sushiSwap: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
  // pancakeSwap: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
};
