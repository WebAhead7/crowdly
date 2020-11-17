const db = require("../database/connection");

function newPost(request, response) {
  response.writeHead(200, { "content-type": "text/html" });

  response.end("<h1>new Post</h1>");
}

module.exports = newPost;
