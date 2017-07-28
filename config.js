'use strict';

const bunyan = require('bunyan');

const pkg = require('package.json');

module.exports = {
  name: pkg.name,
  version: pkg.version,
  env: process.env.ENV, 
  log: {
    level: process.env.LOG_LEVEL || 'DEBUG',
    stream: process.env.ENV === 'test' ?
      new bunyan.RingBuffer({ limit: 1000 }) :
      process.stdout,
  },
  service: {
    address: process.env.ADDRESS || 'localhost:50051',
    certs: {
      server: process.env.CERTS_SERVER,
      key: process.env.CERTS_KEY
    },
  },
};
