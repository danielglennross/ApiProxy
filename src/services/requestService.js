'use strict';

class RequestService {
    getRequestContext(request) {
        const reqContext = {
            method: request.method,
            uri: request.info.host + request.params.path,
            options: {
                headers: {
                    'Content-Type':'application/json',
                    'X-Correlation-Token': `apiproxy-${Date.now()}`,
                    'X-Site-Code': request.headers['x-site-code']
                },
                payload: request.payload ? JSON.stringify(request.payload) : null,
                timeout: 5000
            }
        };
        return Promise.resolve(reqContext);
    }
}

module.exports = new RequestService();