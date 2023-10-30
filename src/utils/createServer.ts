import fastify from 'fastify';
// import swagger from '@fastify/swagger';

import { exchangeRoute } from '../modules/exchange/exchange.route';
// import { version } from '../../package.json';

export const createServer = async () => {
  const app = fastify();

  // app.register(swagger, {
  //   routePrefix: '/docs',
  //   swagger: {
  //     tags: [
  //       {
  //         name: 'todo',
  //       },
  //     ],
  //     info: {
  //       title: 'Todo',
  //       description: 'A simple todo app',
  //       version,
  //     },
  //   },
  //   staticCSP: true,
  //   exposeRoute: true,
  // });

  app.register(exchangeRoute, { prefix: '/api/v1/exchange' });

  return app;
};
