import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { AlchemyWebSocketProvider } from '@ethersproject/providers';

import { config } from '../../utils/config';
import { logger } from '../../utils/logger';
import { provider } from '../../utils/ethereum';
import FactoryAbi from './contracts/Factory.abi';
import PairAbi from './contracts/Pair.abi';
import {
  SwapProtocol,
  swapFactoryAddress,
  protocols,
  swapEvent,
} from './swap.constants';
import { Token } from '../token/token.model';
import { Pair } from '../pair/pair.model';

type SwapPairAddresses = {
  token0: string;
  token1: string;
  sushiSwap: string;
  uniSwap: string;
  // pancakeSwap: string;
};

export const getSwapPairAddresses = async (
  token0: Token,
  token1: Token,
): Promise<SwapPairAddresses> => {
  const swapPairAddresses: SwapPairAddresses = {
    token0: AddressZero,
    token1: AddressZero,
    sushiSwap: AddressZero,
    uniSwap: AddressZero,
    // pancakeSwap: AddressZero,
  };
  const promises = Object.entries(swapFactoryAddress).map(
    async ([protocol, address]: [string, string]) => {
      if (!swapFactoryAddress.hasOwnProperty(protocol)) return;
      try {
        const factoryContract = new Contract(
          address as string,
          FactoryAbi,
          provider,
        );
        swapPairAddresses[protocol as SwapProtocol] =
          await factoryContract.getPair(token0.address, token1.address);

        if (protocol === 'uniSwap') {
          const pairContract = new Contract(
            swapPairAddresses.uniSwap,
            PairAbi,
            provider,
          );
          swapPairAddresses.token0 = await pairContract.token0();
          swapPairAddresses.token1 = await pairContract.token1();
        }
      } catch (e) {
        logger.error(
          e,
          `getSwapPairAddresses: failed to get pair address of ${token0.symbol}-${token1.symbol} for ${protocol} protocol`,
        );
      }
    },
  );

  await Promise.all(promises); // This ensures all operations are completed
  return swapPairAddresses;
};

export const startSwapEventListener = (pair: Pair): any => {
  // Reset if it's already running
  if (swapEvent[pair._id]) {
    protocols.forEach((protocol: SwapProtocol) => {
      // Remove timeout to avoid multiple call
      clearTimeout(swapEvent[pair._id].uniSwap.timeout);

      // Reset Alchemy Provider
      swapEvent[pair._id][protocol].provider.removeAllListeners();
      swapEvent[pair._id][protocol].contract.removeAllListeners();
      swapEvent[pair._id][protocol].provider.destroy();
    });

    delete swapEvent[pair._id];

    logger.info(
      `Removed Swap event listener and reconnect timeout for contract ${pair._id}`,
    );
    return startSwapEventListener(pair);
  }

  const provider = new AlchemyWebSocketProvider(
    'homestead',
    config.ALCHEMY_API_KEY,
  );

  protocols.forEach((protocol: SwapProtocol) => {
    // Set swap event data
    // const currentPairProtocolData =
    swapEvent[pair._id] = swapEvent[pair._id] || {};
    swapEvent[pair._id][protocol] = {
      provider,
      contract: new Contract(pair[protocol], PairAbi, provider),
      pair,
      // Schedule a reconnect after 15 minutes (just to be sure that we are correctly listening the contract events)
      timeout: setTimeout(() => startSwapEventListener(pair), 60 * 15 * 1000),
    };

    // Subscribe to Protocol Swap events
    swapEvent[pair._id][protocol].contract.on(
      'Swap',
      (sender, amount0In, amount1In, amount0Out, amount1Out, to) =>
        swapEventHandler(protocol, pair, {
          sender,
          amount0In,
          amount1In,
          amount0Out,
          amount1Out,
          to,
        }),
    );
  });

  logger.info(
    `Subscribed to Swap events of pair ${JSON.stringify(
      pair,
    )} with AlchemyWebSocketProvider`,
  );
};

const swapEventHandler = (
  protocol: SwapProtocol,
  pair: Pair,
  eventPayload: any,
) => {
  const eventInfo = {
    type: `Swap ${protocol.toUpperCase()}`,
    sender: eventPayload.sender,
    to: eventPayload.to,
    [`${pair.token0.symbol} In`]: eventPayload.amount0In.toString(),
    [`${pair.token1.symbol} In`]: eventPayload.amount1In.toString(),
    [`${pair.token0.symbol} Out`]: eventPayload.amount0Out.toString(),
    [`${pair.token1.symbol} Out`]: eventPayload.amount1Out.toString(),
  };
  logger.info(JSON.stringify(eventInfo));
};
