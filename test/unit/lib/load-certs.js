'use strict';

const { describe, it }  = require('mocha');
const { expect }        = require('chai');

const loadCerts = require('lib/load-certs');

describe('loading the certificates', () => {

  it('should throw an exception when passing the wrong object or data',
    (done) => {
      const res = () => {
        loadCerts();
      };

      expect(res).to.throw();
      done();
    }
  );

  it('should return an array with 2 elements', (done) => {
    const certs = {
      ca: '1',
      server: '1',
      key: '1',
    };

    const loaded = loadCerts(certs);

    expect(loaded).to.be.an('array');
    expect(loaded).to.be.deep.equal(
      [
        Buffer.from('1'),
        [
          {
            cert_chain: Buffer.from('1'),
            private_key: Buffer.from('1'),
          },
        ],
      ]
    );
    done();
  });
});
