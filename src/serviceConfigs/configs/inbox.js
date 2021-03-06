'use strict';

const Base = require('../base');
const config = require('../../config/index');

class Inbox extends Base {
    constructor() {
        super();

        this.setRoute('/v1/players/([0-9]+)/messages', req => {
            // do work...
            Promise.resolve({});
        }, res => {
            // do work...
            Promise.resolve({});
        });
    }
    getName() {
        return config.inbox.name;
    }
    getServiceUrl() {
        return config.inbox.uri;
    }
};

module.exports = new Inbox();