'use strict';

const requireDir = require('require-dir');
const serviceConfigs = requireDir('../serviceConfigs/configs');
const _ = require('lodash');

class ApiProxyService {
    getServiceConfig(name) {
        return Promise.resolve(
           _.find(serviceConfigs, x => x.getName().toLowerCase() === name.toLowerCase())
        );
    }    
}

module.exports = new ApiProxyService();