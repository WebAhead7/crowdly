const db = require("../database/connection");

function register(request, response) {
  response.writeHead(200, { "content-type": "text/html" });

  response.end("<h1>register</h1>");
}

module.exports = register;
