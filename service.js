'use strict';

const server = require('grpc.server');

const config    = require('config.js');
const functions = require('./functions');
const logger    = require('log.js').child({ origin: 'service' });

module.exports = service();

function service () {
  const rpcServer = server(config.service.address, config.service.certs);

  rpcServer.addServices(functions);

  return {
    start: start,
    stop: stop,
  };

  function start (cb) {
    logger.info(
      { address: config.service.address },
      `starting service at ${config.service.address}`
    );

    rpcServer.start(cb);
  }

  function stop (cb) {
    logger.info('stopping service...');
    rpcServer.stop(cb);
  }
}
