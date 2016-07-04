'use strict';

const apiProxyService = require('../../services/apiProxyService');
const requestService = require('../../services/requestService');

exports.process = (request, reply) => {
     const configTask = apiProxyService.getServiceConfig(request.params.service);
     const requestContextTask = configTask.then(c => {
         request.info.host = c.getServiceUrl();
         return requestService.getRequestContext(request);
     });

     Promise.all([configTask, requestContextTask])
        .then(res => {
            const config = res[0]; const context = res[1];
            return apiProxyService.makeRequest(
                context, (req) => config.onRequest(req), (resp) => config.onResponse(resp));
        })
        .then(res => reply(res))
        .catch(err => {
            console.log(err);
            reply(err).code(500);
        });
};
