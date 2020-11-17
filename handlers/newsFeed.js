function newsFeed(request, response) {
  response.writeHead(200, { "content-type": "text/html" });

  response.end("<h1>All Post</h1>");
}

module.exports = newsFeed;
