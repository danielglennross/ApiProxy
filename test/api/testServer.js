'use strict';

process.env.ENVIRONMENT = 'local';

const nock = require('nock');
const server = require('../../src/server');

let fakeServer;

exports.create = () => {

    // prevent test runner ever connecting to real services
    nock.disableNetConnect();

    server(realServer => {
        fakeServer = realServer;
    });

    return fakeServer;
};

