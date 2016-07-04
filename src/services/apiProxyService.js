'use strict';

const requireDir = require('require-dir');
const Wreck = require('wreck');
const serviceConfigs = requireDir('../serviceConfigs/configs');
const _ = require('lodash');

class ApiProxyService {
    getServiceConfig(name) {
        return Promise.resolve(
           _.find(serviceConfigs, 
                x => x.getName().toLowerCase() === name.toLowerCase())
        );
    }

    makeRequest(reqContext, onRequest, onResponse) {
        if (onRequest) onRequest(reqContext);

        return new Promise((resolve, reject) => 
            Wreck.request(reqContext.method, reqContext.uri, reqContext.options, (err, response) => {
                if (err) return reject(err);
                if (onResponse) onResponse(response);
                resolve(response);
            })
        );
    }    
}

module.exports = new ApiProxyService();