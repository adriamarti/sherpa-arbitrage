import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Document } from 'mongoose';

// Forward declare the Pair class
// Can't import Pair from 'pair.model.ts' because circular dependency issue
class Pair {}

export class Token extends Document {
  @prop({ type: String, required: true, unique: true })
  name!: string;

  @prop({ type: String, required: true, unique: true })
  symbol!: string;

  @prop({ type: Number, required: true })
  decimals!: number;

  @prop({ type: String, required: true, unique: true })
  address!: string;

  @prop({ ref: () => Pair, required: false })
  pair: Ref<Pair>[] = [];
}

export const TokenModel = getModelForClass(Token, {
  schemaOptions: {
    timestamps: true,
  },
});
