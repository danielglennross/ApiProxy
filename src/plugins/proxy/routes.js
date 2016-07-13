'use strict';

const Joi = require('joi');

exports.registerRoutes = (server, option) => {
    server.route({
        method: ['GET', 'PUT', 'POST', 'DELETE'],
        path: '/{service}/{path*}',
        config: {
            validate: {
                params: {
                    service: Joi.string().required(),
                    path: Joi.string().required()
                },
                failAction: handleJoiValidationError
            },
        },
        handler: {
          process: {}
        }
    });
};

const handleJoiValidationError = (request, reply, source, error) => {
    console.log(error);
    reply(error);
};