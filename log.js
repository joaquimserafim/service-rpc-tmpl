'use strict';

const bunyan = require('bunyan');

const config = require('config.js');

module.exports = bunyan
  .createLogger(
    {
      name: config.name,
      level: config.log.level,
      stream: config.log.stream,
    }
  );
