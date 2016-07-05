'use strict';

var Confidence = require('confidence');
var services = require('./services');

const store = new Confidence.Store(services);
const criteria = {
  env: process.env.ENVIRONMENT || 'local'
};

module.exports = store.get('/', criteria);