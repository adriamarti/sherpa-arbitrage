import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';

import { logger } from '../../utils/logger';
import { provider } from '../../utils/ethereum';
import FactoryAbi from './contracts/Factory.abi';
import { SwapProtocol, swapFactoryAddress } from './swap.constants';
import { Token } from '../token/token.model';

export const getSwapPairAddresses = async (
  token0: Token,
  token1: Token,
): Promise<Record<SwapProtocol, string>> => {
  const swapPairAddresses: Record<SwapProtocol, string> = {
    sushiSwap: AddressZero,
    uniSwap: AddressZero,
  };
  const promises = Object.entries(swapFactoryAddress).map(
    async ([protocol, address]: [string, string]) => {
      if (!swapFactoryAddress.hasOwnProperty(protocol)) return;
      try {
        const contract = new Contract(address as string, FactoryAbi, provider);
        swapPairAddresses[protocol as SwapProtocol] = await contract.getAddress(
          token0.address,
          token1.address,
        );
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
