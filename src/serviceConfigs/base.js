'use strict';

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
    }
}