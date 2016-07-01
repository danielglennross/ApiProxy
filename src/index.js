'use strict';

const Glue = require('glue');
const manifest = require('./config/glue.manifest.json');
const options = {
    relativeTo: __dirname + '/plugins'
};

Glue.compose(manifest, options, (err, server) => {
    server.start(function (err) {
        // API running on port 3000
        if (err) throw err;
        console.log('Server running at:', server.info.uri);
    });
});