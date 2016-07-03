'use strict';

const Base = require('../base');

class Notes extends Base {
    constructor() {
        super();

        this.setRoute('/notes', req => {
            Promise.resolve({});
        }, res => Promise.resolve({}));
    }
    getName() {
        return 'notes';
    }
    getServiceUrl() {
        return 'http://ew1-dv01-501-ilb.ad.bedegaming.com:1737/api/'; //todo read from config
    }
}

module.exports = new Notes();