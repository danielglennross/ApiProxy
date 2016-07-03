'use strict';

class PermissionService {
    process(request, reply) {

        return reply.continue();
    }
}

module.exports = new PermissionService();