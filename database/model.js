const db = require("./connection");

function getAllPosts() {
  return db
    .query(
      `
      select users.username, users.id, blog_posts.text_content, blog_posts.id, blog_posts.post_date from blog_posts left join users on users.id = blog_posts.user_id order by blog_posts.post_date;
    `
    )
    .then((result) => result.rows);
}
function postPost(user_id, postContent) {
  const values = [parseInt(user_id), postContent];
  return db.query(
    "INSERT INTO blog_posts(user_id,text_content) VALUES($1, $2)",
    values
  );
}

function getUser(username, password) {
  console.log(username, password);
  return db
    .query(`SELECT * from users where username = $1 and user_password = $2`, [
      username,
      password,
    ])
    .then((results) => results.rows);
}
module.exports = { getAllPosts, postPost, getUser };
function addNewComment(user_id, post_id, comment_content) {
  const values = [parseInt(user_id), parseInt(post_id), comment_content];
  return db.query(
    "INSERT INTO comments(user_id,post_id, comment_content) VALUES($1, $2, $3)",
    values
  );
}

module.exports = { getAllPosts, postPost, addNewComment, getUser };
