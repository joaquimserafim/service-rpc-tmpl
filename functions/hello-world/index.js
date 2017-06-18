'use strict';

const logger = require('log.js').child({ origin: 'hello-world' });

//
// Hello World Function
//

module.exports = {
  proto: 'functions/hello-world/contracts/hello-world.proto',
  package: 'helloWorld',
  name: 'Greeter',
  methods: { sayHello: sayHello }
};

function sayHello (call, cb) {

  logger.info({ req: call.request }, 'sayHello function');

  const res = !call.request.name ?
    new Error('name should exists') :
    { message: 'Hello ' + call.request.name };

  return res.constructor.name === 'Error' ?
    cb(res) :
    cb(null, res);
}
