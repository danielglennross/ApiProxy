'use strict';

const Wreck = require('Wreck');

exports.logRequestContent = request => {
    console.log(request.options.payload);
    Promise.resolve({});
};

exports.logResponseContent = response => {
    return new Promise((resolve, reject) => {
        resolve(response);
        // Wreck.read(response, null, (error, body) => {
        //     console.log(response.statusCode);
        //     return resolve(response);
        // });
    });
};