const home = require("./handlers/home");
const loginPage = require("./handlers/loginPage");
const registerPage = require("./handlers/registerPage");
const login = require("./handlers/login");
const register = require("./handlers/register");
const newPost = require("./handlers/newPost");
const newsFeed = require("./handlers/newsFeed");
const resources = require("./handlers/resources");
const missing = require("./handlers/missing");
const addComment = require("./handlers/addComment");

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
  } else if (url === "/registerpage") {
    registerPage(request, response);
  } else if (url === "/register") {
    register(request, response);
  } else if (url === "/newpost") {
    newPost(request, response);
  } else if (url === "/addcomment") {
    addComment(request, response);
  } else if (url === "/newsfeed") {
    newsFeed(request, response);
  } else {
    missing(request, response);
  }
}

module.exports = router;
