'use strict';

const Base = require('../base');

class Inbox extends Base {
    constructor() {
        super();

        this.setRoute('/v1/players/([0-9]+)/messages', req => {
            Promise.resolve({});
        }, res => Promise.resolve({}));
    }
    getName() {
        return 'inbox';
    }
    getServiceUrl() {
        return 'http://ew1-dv01-570-ilb.ad.bedegaming.com:9090/'; //todo read from config
    }
};

module.exports = new Inbox();