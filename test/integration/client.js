'use strict';

const client = require('grpc.client');
const thunky = require('thunky');

const createCertificate = require('test/create-certificate');

class Client {

  constructor() {
    this._client = {};

    this._startService = thunky((cb) => {
      setupServiceCertificates((_, service) => {

        createCertificate((__, pem) => {
          this._service = service;
          this._service.start(cb);
          this._client = client(
            {
              address: '127.0.0.1:50051',
              creedentials: {
                ca: process.env.CERTS_CA,
                key: pem.privateKey,
                client: pem.certificate
              }
            }
          );
        });
      });
    });
  }

  serviceStop(cb) {
    this._service.stop(cb);
  }

  call(conf, fnName, data, metadata, cb) {
    if (typeof metadata === 'function') {
      cb = metadata;
      metadata = null;
    }

    this._startService(() => {
      const fn2exec = this._client.service(conf.serviceName, conf.protoFile);
      fn2exec[fnName](data, metadata).end(cb);
    });
  }
}

module.exports = new Client();

function setupServiceCertificates(cb) {

  createCertificate((err, pem) => {
    if (err) {
      throw err;
    }

    process.env.CERTS_SERVER  = pem.certificate;
    process.env.CERTS_KEY     = pem.privateKey;
    process.env.CERTS_CA      = pem.certificate;

    const service = require('service.js');

    cb(null, service);
  });
}
