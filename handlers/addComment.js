const { addNewComment } = require("../database/model");

function addComment(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const { comment_owner, post_id, comment_content } = JSON.parse(body);
    console.log(comment_owner, post_id, comment_content);
    addNewComment(comment_owner, post_id, comment_content)
      .then(() => {
        response.writeHead(201, { "content-type": "text/html" });
        response.end(JSON.stringify(`Success, Your comment where added !`));
      })
      .catch((error) => {
        console.log(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`Something went wrong, Please try again !`);
      });
  });
}

module.exports = addComment;
