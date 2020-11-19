const { postPost } = require("../database/model");

function newPost(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const { user_id, text_content } = JSON.parse(body);

    postPost(user_id, text_content)
      .then(() => {
        response.writeHead(201, { "content-type": "text/html" });
        response.end(JSON.stringify(`Success, Your post where added !`));
      })
      .catch((error) => {
        console.log(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`Something went wrong, Please try again !`);
      });
  });
}

module.exports = newPost;
