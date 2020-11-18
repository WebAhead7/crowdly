const model = require("../database/model");

function login(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    var data = JSON.parse(body);

    model
      .getUser(data.username, data.password)
      .then((result) => {
        console.log(result);
        if (result.length === 0) {
          response.writeHead(500, { "content-type": "application/json" });
          response.end(JSON.stringify("the user is not  found"));
        } else {
          response.writeHead(200, { "content-type": "application/json" });
          response.end(JSON.stringify("success"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
module.exports = login;
