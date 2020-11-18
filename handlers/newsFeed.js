const { getAllPosts } = require("../database/model");

function newsFeed(request, response) {
  getAllPosts()
    .then((res) => {
      const data = JSON.stringify(res);
      response.writeHead(200, { "content-type": "application/json" });
      response.write(data);
      response.end();
    })
    .catch((e) => {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(`<h1>Something went wrong \n ${e.message}</h1>`);
      console.log(e);
    });
}

module.exports = newsFeed;
