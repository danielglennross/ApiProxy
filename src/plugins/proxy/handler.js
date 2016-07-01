'use strict';

const apiProxyService = require('../../services/apiProxyService');

exports.process = (request, reply) => {
    apiProxyService.getServiceConfig(request.params.service)
    .then(c => new Promise((res,rej) => {
        res();   
    }))
    .then(() => reply("cool").code(200))
    .catch(err => console.log(err));
}
