import { AlchemyProvider } from '@ethersproject/providers';

import { config } from './config';

export const provider = new AlchemyProvider(
  'homestead',
  config.ALCHEMY_API_KEY,
);
