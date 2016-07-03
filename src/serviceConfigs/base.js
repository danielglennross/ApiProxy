'use strict';

const events = require('events');
const _ = require('lodash');

module.exports = class Base {
    constructor() {
        if (this.constructor === Base) {
            throw new TypeError("Cannot construct Base directly");
        }
        if (this.getName === undefined) {
            throw new TypeError("Must override name");
        }
        if (this.getServiceUrl === undefined) {
            throw new TypeError("Must override serviceUrl")
        }
        this.routeReqs = new Array();
        this.eventEmitter = new events.EventEmitter();
    }

    setOnRequest(onReq) {
        this.eventEmitter.on('onRequest', onReq);
    }

    setOnResponse(onResp) {
        this.eventEmitter.on('onResponse', onResp);
    }

    setRoute(route, onRequest, onResponse) {
        this.routeReqs.push({ 
            route: route,
            onRequest: onRequest,
            onResponse: onResponse 
        });
    }

    onRequest(request) {
        const r = _.find(this.routeReqs, x => request.path.match(x.route));
        if (r && r.onRequest) {
            this.eventEmitter.on('onRequest', r.onRequest);
        }
        this.eventEmitter.emit('onRequest', request);
    }

    onResponse(response) {
        const r = _.find(this.routeReqs, x => response.path.match(x.route));
        if (r && r.onResponse) {
            this.eventEmitter.on('onResponse', r.onResponse);
        }
        this.eventEmitter.emit('onResponse', response);
    }
}