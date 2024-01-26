import fastify from 'fastify';
// import swagger from '@fastify/swagger';

// import { tokenRoute } from '../modules/token/token.route';
// import { pairRoute } from '../modules/pair/pair.route';
// import { uniswapRoute } from '../modules/uniswap/uniswap.route';
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

  // app.register(tokenRoute, { prefix: '/api/v1/tokens' });
  // app.register(pairRoute, { prefix: '/api/v1/pairs' });
  // app.register(uniswapRoute, { prefix: '/api/v1/uniswap' });

  return app;
};
