'use strict';

const Base = require('../base');

class Inbox extends Base {
    constructor() {
        super();

        this.setRoute('/v1/players/(\d+)/messages', req => {
            Promise.resolve({});
        }, res => Promise.resolve({}));
    }
    getName() {
        return 'inbox';
    }
    getServiceUrl() {
        return 'http://ew1-dv01-501-ilb.ad.bedegaming.com:1737/api/'; //todo read from config
    }
}

module.exports = new Inbox();