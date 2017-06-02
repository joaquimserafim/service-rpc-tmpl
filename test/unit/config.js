'use strict';

const { describe, it, before, after } = require('mocha');
const { expect }                      = require('chai');

var config;

describe('config', () => {

  before(() => {
    delete require.cache[require.resolve('config.js')];
  });

  after(() => {
    delete require.cache[require.resolve('config.js')];
  });

  it('log - using the process.stdout', (done) => {
    process.env.ENV = 'PROD';

    config = require('config.js');

    expect(config.log.stream).to.be.deep.equal(process.stdout);

    done();
  });
});
