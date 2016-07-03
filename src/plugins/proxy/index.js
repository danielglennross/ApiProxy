'use strict';

const routes = require('./routes');
const handler = require('./handler');
const permissionService = require('../../services/permissionService');

exports.register = (server, options, next) => {
    server.ext('onRequest', permissionService.process);
    server.handler('process', () => handler.process);
    routes.registerRoutes(server, options);
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};