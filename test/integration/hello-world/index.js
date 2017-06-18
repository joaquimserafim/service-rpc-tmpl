'use strict';

const { describe, it }  = require('mocha');
const { expect }        = require('chai');

const client = require('test/integration/client');

const proto = 'functions/hello-world/contracts/hello-world.proto';

const serviceConfig = { serviceName: 'Greeter', protoFile: proto };

describe('Hello World function', () => {

  it('should return successful with a valid response', (done) => {
    client
      .call(serviceConfig, 'sayHello', { name: 'Joe' }, (err, res) => {
        expect(err).to.be.equal(null);
        expect(res).to.be.deep.equal({ message: 'Hello Joe' });
        done();
      });
  });

  it('should throw an error with the respective error message ' +
    'when the service responses with an error',
    (done) => {
      client
        .call(serviceConfig, 'sayHello', {}, (err, res) => {
          expect(err).to.be.an.instanceof(Error);
          expect(res).to.be.equal(undefined);
          client.serviceTearDown(done);
        });
    }
  );

  it('should throw an error with the respective error message when ' +
    ' the service don\'t response back or is not listening',
    (done) => {
      client
        .call(serviceConfig, 'sayHello', {}, (err, res) => {
          expect(err).to.be.an.instanceof(Error);
          expect(err.message).to.be.equal('Connect Failed');
          expect(res).to.be.equal(undefined);
          done();
        });
    }
  );
});
