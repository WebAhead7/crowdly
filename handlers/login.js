function login(request, response) {
  response.writeHead(200, { "content-type": "text/html" });

  response.end("<h1>login</h1>");
}

module.exports = login;
