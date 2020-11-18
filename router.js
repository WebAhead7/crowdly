const home = require("./handlers/home");
const loginPage = require("./handlers/loginPage");
const login = require("./handlers/login");
const register = require("./handlers/register");
const newPost = require("./handlers/newPost");
const newsFeed = require("./handlers/newsFeed");
const resources = require("./handlers/resources");
const missing = require("./handlers/missing");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    home(request, response);
  } else if (url.includes("/public")) {
    resources(request, response);
  } else if (url === "/login" && request.method === "POST") {
    login(request, response);
  } else if (url === "/loginpage") {
    loginPage(request, response);
  } else if (url === "/register") {
    register(request, response);
  } else if (url === "/newpost") {
    newPost(request, response);
  } else if (url === "/newsfeed") {
    newsFeed(request, response);
  } else {
    missing(request, response);
  }
}

module.exports = router;
