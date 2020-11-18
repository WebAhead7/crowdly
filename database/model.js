const db = require("./connection");

function getAllPosts() {
  return db
    .query(
      `
    SELECT users.username, blog_posts.text_content
    ROM blog_posts LEFT JOIN users
    ON users.id = blog_posts.user_id
    ORDER BY users.id;
    `
    )
    .then((result) => result.rows);
}
function postPost(user, postContent) {
  const values = [user.id, postContent];
  return db.query(
    "INSERT INTO blog_posts(user_id,text_content) VALUES($1, $2)",
    values
  );
}

function getUser(username, password) {
  return db
    .query(`SELECT * from users where username = $1 and user_password = $2`, [
      username,
      password,
    ])
    .then((results) => results.rows);
}
module.exports = { getAllPosts, postPost, getUser };
