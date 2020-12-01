const model = require("../database/model");
const fs = require("fs");
const path = require("path");
const missing = require("./missing");
const db = require("../database/connection");

function registerPage(request, response) {
  const filePath = path.join(__dirname, "..", "public", "register.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      missing(request, response);
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(file);
    }
  });
}
module.exports = registerPage;
