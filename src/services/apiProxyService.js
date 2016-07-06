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
        const onReqTask = onRequest ? onRequest(reqContext) : Promise.resolve();
        const reqTask = onReqTask.then(_ => this._makeReq(reqContext));
        const onRespTask = reqTask.then(resp => onResponse ? onResponse(resp) : Promise.resolve());
        return Promise.all([onReqTask, reqTask, onRespTask]).then(arr => Promise.resolve(arr[1]));
        // const onReqTask = onRequest ? onRequest(reqContext) : Promise.resolve({});
        // return onReqTask.then(_ => new Promise((resolve, reject) => 
        //     Wreck.request(reqContext.method, reqContext.uri, reqContext.options, (err, response) => {
        //         if (err) return reject(err);
        //         const onRespTask = onResponse ? onResponse(response) : Promise.resolve({});
        //         onRespTask.then(_ => resolve(response));
        //     })
        // ));
    }

    _makeReq(reqContext) {
        return new Promise((resolve, reject) => 
            Wreck.request(reqContext.method, reqContext.uri, reqContext.options, (err, response) => {
                if (err) { 
                    return reject(err);
                }
                resolve(response);
            })
        );
    }  
}

module.exports = new ApiProxyService();