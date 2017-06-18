'use strict';

const client = require('grpc.client');
const thunky = require('thunky');

const config = require('config.js');

const service = require('service.js');

class Client {

  constructor() {
    this._client = client(
      {
        address: config.service.address
      }
    );

    this._serviceStart = thunky((cb) => {
      this._service = service;
      this._service.start(cb);
    });
  }

  serviceTearDown(cb) {
    this._service.stop(cb);
  }

  call(conf, fnName, data, metadata, cb) {

    this._serviceStart(() => {
      if (typeof metadata === 'function') {
        cb = metadata;
        metadata = null;
      }

      const fn2exec = this._client.service(conf.serviceName, conf.protoFile);

      fn2exec[fnName](data)
        .setMetadata(metadata)
        .end(cb);
    });
  }
}

module.exports = new Client();
