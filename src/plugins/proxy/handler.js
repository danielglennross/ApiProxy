'use strict';

const apiProxyService = require('../../services/apiProxyService');

exports.process = (request, reply) => {
    apiProxyService.getServiceConfig(request.params.service)
    .then(config => {
        request.info.host = config.getServiceUrl();      
        return apiProxyService.makeRequest(
            request, (req) => config.onRequest(req), (resp) => config.onResponse(resp)); 
        })
    .then(r => new Promise((resolve, reject) => {
        resolve(reply(r));
    }))
    .catch(err => {
        console.log(err);
        reply(err).code(500);
    });
}
