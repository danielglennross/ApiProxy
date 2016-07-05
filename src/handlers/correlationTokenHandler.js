'use strict';

module.exports = request => {
    request.options.headers['X-Correlation-Token'] = `apiproxy-${Date.now()}`;
    Promise.resolve({});
};