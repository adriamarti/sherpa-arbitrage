import { Types } from 'mongoose';
import axios from 'axios';

import { Token, TokenModel } from './token.model';
import { CreateTokenBody, UpdateTokenBody } from './token.schema';
import { config } from '../../utils/config';

export const createToken = async (input: CreateTokenBody): Promise<Token> => {
  return TokenModel.create({ ...input });
};

export const getAllTokens = async (): Promise<Token[]> => {
  return TokenModel.find().populate('pair').lean();
};

export const getToken = async (
  id: Types.ObjectId,
): Promise<Token | null | undefined> => {
  return TokenModel.findById(id).populate('pair').lean();
};

export const updateToken = async (
  id: Types.ObjectId,
  input: UpdateTokenBody,
): Promise<Token | null | undefined> => {
  return TokenModel.findByIdAndUpdate(id, input, { new: true })
    .populate('pair')
    .lean();
};

export const deleteToken = async (
  id: Types.ObjectId,
): Promise<Token | null | undefined> => {
  return TokenModel.findByIdAndDelete(id).populate('pair').lean();
};

export const addPairToken = async (
  id: Types.ObjectId,
  pairId: Types.ObjectId,
): Promise<Token | null | undefined> => {
  return TokenModel.findByIdAndUpdate(
    id,
    { $push: { pair: pairId } },
    { new: true },
  )
    .populate('pair')
    .lean();
};

export const getTokenPrice = async (symbol: string) => {
  const options = {
    headers: { 'X-CMC_PRO_API_KEY': config.COIN_MARKET_CAP_AKI_KEY },
  };
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;
  const { data } = await axios.get(url, options);

  return data.data[symbol].quote.USD.price;
};
