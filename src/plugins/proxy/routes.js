'use strict'

exports.registerRoutes = (server, option) => {
    server.route({
        method: ['GET', 'PUT', 'POST', 'DELETE'],
        path: '/{service}/{path*}',
        config: {
             validate: {
             }
        },
        handler: {
          process: {}
        }
    });
};