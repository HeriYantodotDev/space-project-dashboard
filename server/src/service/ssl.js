const path = require("path");

const fs = require('fs');

function setUpSSL() {
  const options = {
    key: fs.readFileSync(path.join(__dirname, "..", "..", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "..", "..", "cert.pem"))
  }
  return options;
}

module.exports = {
  setUpSSL
};
