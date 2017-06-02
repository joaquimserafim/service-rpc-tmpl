'use strict';

const {Server, ServerCredentials} = require('grpc');

const config    = require('config.js');
const functions = require('./functions');
const loadCerts = require('lib/load-certs');
const logger    = require('log.js').child({ origin: 'service' });

module.exports = service();

function service() {
  const rpcServer = new Server();

  const address   = `${config.service.address}:${config.service.port}`;

  const credentials = ServerCredentials
    .createSsl
    .apply(null, loadCerts(config.service.certs));

  for (let f in functions) {
    rpcServer.addService(functions[f].service, functions[f].fn);
  }

  rpcServer.bind(address, credentials);

  return {
    start: start,
    stop: stop
  };

  function start(cb) {
    rpcServer.start();

    logger.info({ address: address }, 'service started');

    return cb();
  }

  function stop(cb) {
    rpcServer.tryShutdown(shutdow);

    function shutdow() {
      setTimeout(() => {
        logger.info('service stopped');
        rpcServer.started = false;
        cb();
      }, 50);
    }
  }
}
