'use strict';

const { load } = require('grpc');

const logger = require('log.js').child({ origin: 'hello-world' });

//
// Hello World Function
//

module.exports = {
  service: load('functions/hello-world/contracts/hello-world.proto')
    .helloWorld
    .Greeter
    .service,
  fn: { sayHello: sayHello },
};

function sayHello(call, cb) {

  logger.info({ req: call.request }, 'sayHello function');

  const res = !call.request.name ?
    new Error('name should exists') :
    { message: 'Hello ' + call.request.name };

  return res.constructor.name === 'Error' ?
    cb(res) :
    cb(null, res);
}
