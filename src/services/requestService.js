'use strict';

class RequestService {
    getRequestContext(request) {
        const reqContext = {
            method: request.method,
            host: request.info.host,
            path: request.params.path,
            uri: request.info.host + request.params.path,
            options: {
                headers: {
                    'Content-Type':'application/json'
                },
                payload: request.payload ? JSON.stringify(request.payload) : null,
                timeout: 5000
            }
        };
        return Promise.resolve(reqContext);
    }
}

module.exports = new RequestService();