function missing(request, response) {
  response.writeHead(404, { "content-type": "text/html" });

  response.end("<h1>NOT FOUND</h1>");
}

module.exports = missing;
