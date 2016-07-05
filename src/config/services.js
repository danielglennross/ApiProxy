'use strict';

module.exports = {
    notes: {
        name: 'notes',
        uri: {
            $filter: 'env',
            local: 'http://ew1-dv01-501-ilb.ad.bedegaming.com:1737/api/',
            dv01: 'http://ew1-dv01-501-ilb.ad.bedegaming.com:1737/api/',
            $default: 'none'
        }
    },

    inbox: {
        name: 'inbox',
        uri: {
            $filter: 'env',
            local: 'http://ew1-dv01-570-ilb.ad.bedegaming.com:9090/',
            dv01: 'http://ew1-dv01-570-ilb.ad.bedegaming.com:9090/',
            $default: 'none'
        }
    }
};