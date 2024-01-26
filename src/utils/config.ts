import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  PORT: Type.Number({ default: 4000 }),
  HOST: Type.String({ default: '0.0.0.0' }),
  DB_URL: Type.String(),
  ALCHEMY_API_KEY: Type.String(),
  COIN_MARKET_CAP_AKI_KEY: Type.String(),
});

type Env = Static<typeof schema>;

export const config = envSchema<Env>({
  schema,
  dotenv: true,
});
