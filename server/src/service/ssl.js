const path = require("path");

const fs = require('fs');

require('dotenv').config();


function setUpSSL() {

  const KEY_PEM = fs.readFileSync(path.join(__dirname, "..", "..", "key.pem"), 'utf8');
  const CERT_PEM = fs.readFileSync(path.join(__dirname, "..", "..", "cert.pem"), 'utf8');

  const options = {
    key: KEY_PEM,
    cert: CERT_PEM
  }

  return options;
}

module.exports = {
  setUpSSL
};