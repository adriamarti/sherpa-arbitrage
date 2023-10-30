import { nanoid } from 'nanoid';

import { Exchange, ExchangeModel } from './exchange.model';
import { CreateExchangeBody } from './exchange.schema';

// Todo type input
export const createExchange = async (
  input: CreateExchangeBody,
): Promise<Exchange> => {
  const shortId = `exchange_${nanoid}`;
  return ExchangeModel.create({ ...input });
};
