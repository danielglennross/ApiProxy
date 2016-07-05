'use strict';

const Base = require('../base');
const loggingContentHandler = require('../../handlers/loggingContentHandler');
const config = require('../../config/index');

class Notes extends Base {
    constructor() {
        super();

        this.setRoute('/notes', 
            loggingContentHandler.logRequestContent, 
            loggingContentHandler.logResponseContent);
    }
    getName() {
        return config.notes.name;
    }
    getServiceUrl() {
        return config.notes.uri;
    }
}

module.exports = new Notes();