import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export class Token extends Document {
  @prop({ type: String, required: true, unique: true })
  name!: string;

  @prop({ type: String, required: true, unique: true })
  symbol!: string;

  @prop({ type: Number, required: true })
  decimals!: number;

  @prop({ type: String, required: true, unique: true })
  address!: string;

  @prop({ ref: () => 'Pair', required: false })
  pairs: Ref<any>[] = [];
}

export const TokenModel = getModelForClass(Token, {
  schemaOptions: {
    timestamps: true,
  },
});
