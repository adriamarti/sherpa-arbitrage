import { Types } from 'mongoose';

import { Pair, PairModel } from './pair.model';
import { UpdatePairBody } from './pair.schema';

export const createPair = async (input: any): Promise<Pair> => {
  return PairModel.create({ ...input });
};

export const getAllPairs = async (): Promise<Pair[]> => {
  return PairModel.find().populate('token0').populate('token1').lean();
};

export const getPair = async (
  id: Types.ObjectId,
): Promise<Pair | null | undefined> => {
  return PairModel.findById(id).populate('token0').populate('token1').lean();
};

export const updatePair = async (
  id: Types.ObjectId,
  input: UpdatePairBody,
): Promise<Pair | null | undefined> => {
  return PairModel.findByIdAndUpdate(id, input, { new: true })
    .populate('token0')
    .populate('token1')
    .lean();
};

export const deletePair = async (
  id: Types.ObjectId,
): Promise<Pair | null | undefined> => {
  return PairModel.findByIdAndDelete(id)
    .populate('token0')
    .populate('token1')
    .lean();
};
