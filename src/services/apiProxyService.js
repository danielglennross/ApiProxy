'use strict';

const requireDir = require('require-dir');
const Wreck = require('wreck');
const serviceConfigs = requireDir('../serviceConfigs/configs');
const _ = require('lodash');

class ApiProxyService {
    getServiceConfig(name) {
        return Promise.resolve(
           _.find(serviceConfigs, x => x.getName().toLowerCase() === name.toLowerCase())
        );
    }

    makeRequest(request, onRequest, onResponse) {

        if (onRequest) {
            onRequest(request);
        }

        const uri = request.info.host + (request.params.path ? encodeURIComponent(request.params.path) : '');
        const options = {
            headers: {
                'X-Correlation-Token': `apiproxy-${Date.now()}`,
                'X-Site-Code': 'testsite.com'
            },
            timeout: 5000
        };

        return new Promise((resolve, reject) => 
            Wreck.request(request.method, uri, options, (err, response) => {
                if (err) {
                    reject(err);
                }

                if (onResponse) {
                    onResponse(response);
                }
            })
        );
    }    
}

module.exports = new ApiProxyService();