'use strict';

module.exports = loadCerts;

function loadCerts(certs) {
  return [
    Buffer.from(certs.ca),
    [
      {
        cert_chain: Buffer.from(certs.server),
        private_key: Buffer.from(certs.key),
      },
    ],
  ];
}
