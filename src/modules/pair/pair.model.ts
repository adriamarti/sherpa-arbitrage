import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export class Pair extends Document {
  @prop({ ref: () => 'Token', required: true })
  token0!: Ref<any>;

  @prop({ ref: () => 'Token', required: true })
  token1!: Ref<any>;

  @prop({ type: String, required: false })
  uniSwap!: string;

  @prop({ type: String, required: false })
  sushiSwap!: string;
}

export const PairModel = getModelForClass(Pair, {
  schemaOptions: {
    timestamps: true,
  },
});
