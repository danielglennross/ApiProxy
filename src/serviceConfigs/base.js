'use strict';

const correlationTokenHandler = require('../handlers/correlationTokenHandler');
const _ = require('lodash');

module.exports = class Base {
    constructor() {
        if (this.constructor === Base)
            throw new TypeError("Cannot construct Base directly");
        if (this.getName === undefined)
            throw new TypeError("Must override name");
        if (this.getServiceUrl === undefined) 
            throw new TypeError("Must override serviceUrl");

        this.routeReqs = new Array();
        this.onRequests = [correlationTokenHandler];
        this.onResponses = [resp => resp.headers.processedTimeStamp = Date.now()];
    }

    setOnRequest(onReq) {
        this.onRequests.push(onReq);
    }

    setOnResponse(onResp) {
        this.onResponses.push(onResp);
    }

    setRoute(route, onRequest, onResponse) {
        this.routeReqs.push({ 
            route: route,
            onRequest: onRequest,
            onResponse: onResponse 
        });
    }

    onRequest(request) {
        const r = _.find(this.routeReqs, x => new RegExp(x.route).test(request.path));
        if (r && r.onRequest)
            this.onRequests.push(r.onRequest);
        return this.onRequests.length 
            ? Promise.all(_.forEach(this.onRequests, x => x(request))) 
            : Promise.resolve({});
    }

    onResponse(response) {
        const r = _.find(this.routeReqs, x => new RegExp(x.route).test(response.req.path));
        if (r && r.onResponse)
            this.onResponses.push(r.onResponse);
        return this.onResponses.length 
            ? Promise.all(_.forEach(this.onResponses, x => x(response))) 
            : Promise.resolve({});
    }
};