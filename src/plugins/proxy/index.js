'use strict';

const routes = require('./routes');
const handler = require('./handler');

exports.register = (server, options, next) => {
    server.handler('process', () => handler.process);
    routes.registerRoutes(server, options);
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};