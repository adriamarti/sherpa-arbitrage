import { Pair } from '@uniswap/v2-sdk';
import { Contract } from '@ethersproject/contracts';
import {
  AlchemyWebSocketProvider,
  AlchemyProvider,
} from '@ethersproject/providers';

import { config } from '../../utils/config';
import UniswapV2Factory from './contracts/UniswapV2Factory';
import UniswapV2Pair from './contracts/UniswapV2Pair';
import { logger } from '../../utils/logger';
import { Token } from '../token/token.model';

/**
 * Constant to keep track of all the configured swap event listeners
 */
export const swapEvent: Record<
  string,
  {
    contract: Contract;
    token0: Token;
    token1: Token;
    timeout: any;
    provider: AlchemyWebSocketProvider;
  }
> = {};

export const getPairAddress = async (
  token1: string,
  token2: string,
): Promise<string> => {
  const provider = new AlchemyProvider('homestead', config.ALCHEMY_API_KEY);
  const contract = new Contract(
    UniswapV2Factory.address,
    UniswapV2Factory.abi,
    provider,
  );

  return contract.getPair(token1, token2);
};

export const addSwapEvent = (
  token0: Token,
  token1: Token,
  contractAddress: string,
): any => {
  // Reset if it's already running
  if (swapEvent[contractAddress]) {
    // Remove timeout to avoid multiple call
    clearTimeout(swapEvent[contractAddress].timeout);

    swapEvent[contractAddress].provider.removeAllListeners();
    swapEvent[contractAddress].contract.removeAllListeners();
    swapEvent[contractAddress].provider.destroy();

    delete swapEvent[contractAddress];

    logger.info(
      `Removed Swap event listener and reconnect timeout for contract ${contractAddress}`,
    );
    return addSwapEvent(token0, token1, contractAddress);
  }

  const provider = new AlchemyWebSocketProvider(
    'homestead',
    config.ALCHEMY_API_KEY,
  );

  swapEvent[contractAddress] = {
    provider,
    contract: new Contract(contractAddress, UniswapV2Pair.abi, provider),
    token0,
    token1,
    // Schedule a reconnect after 15 minutes (just to be sure that we are correctly listening the contract events)
    timeout: setTimeout(
      () => addSwapEvent(token0, token1, contractAddress),
      60 * 15 * 1000,
    ),
  };

  // Subscribe to Swap event
  swapEvent[contractAddress].contract.on(
    'Swap',
    (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
      const eventInfo = {
        type: `Swap UniswapV2`,
        sender,
        [`${token0.symbol} In`]: amount0In.toString(),
        [`${token1.symbol} In`]: amount1In.toString(),
        [`${token0.symbol} Out`]: amount0Out.toString(),
        [`${token1.symbol} Out`]: amount1Out.toString(),
        to,
      };
      logger.info(JSON.stringify(eventInfo));
    },
  );
  logger.info(
    `Subscribed to Swap event contract ${contractAddress} with AlchemyWebSocketProvider`,
  );
};
