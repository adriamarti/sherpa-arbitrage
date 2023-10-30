import { getModelForClass, prop } from '@typegoose/typegoose';

export class Exchange {
  @prop({ type: String, required: true })
  name!: string;
}

export const ExchangeModel = getModelForClass(Exchange, {
  schemaOptions: {
    timestamps: true,
  },
});
