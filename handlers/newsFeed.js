const { getAllPosts } = require("../database/model");
const moment = require("moment");

function newsFeed(request, response) {
  getAllPosts()
    .then((res) => {
      response.writeHead(200, { "content-type": "application/json" });
      const filteredData = filterData(res);
      response.write(JSON.stringify(filteredData.reverse()));
      response.end();
    })
    .catch((e) => {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(`<h1>Something went wrong \n ${e.message}</h1>`);
      console.log(e);
    });
}

module.exports = newsFeed;

function filterData(data) {
  const postIds = Array.from(new Set(data.map((comment) => comment.post_id)));
  const posts = postIds.map((postId) => {
    return data.filter((comment) => comment.post_id === postId);
  });
  return posts.map((post) => groupPosts(post));
}

function groupPosts(arr) {
  const { username, text_content, post_id, post_date } = arr[0];
  const comments = arr.map((comment) => {
    const { comment_content, comment_owner } = comment;
    return { comment_content, comment_owner };
  });

  return {
    username,
    text_content,
    post_id,
    post_date,
    comments,
  };
}
