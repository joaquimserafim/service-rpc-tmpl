'use strict';

const bunyan = require('bunyan');

const pkg = require('package.json');

module.exports = {
  name: pkg.name,
  version: pkg.version,
  log: {
    level: process.env.LOG_LEVEL || 'DEBUG',
    stream: process.env.ENV === 'test' ?
      new bunyan.RingBuffer({ limit: 1000 }) :
      process.stdout,
  },
  service: {
    port: process.env.PORT || 50051,
    address: process.env.ADDRESS || '127.0.0.1',
    certs: {
      server: process.env.CERTS_SERVER,
      key: process.env.CERTS_KEY,
      ca: process.env.CERTS_CA,
    },
  },
};
