const db = require("./connection");


function getAllPosts() {
  return db
    .query(
      `

      select users.username, blog_posts.text_content, blog_posts.id as post_id,blog_posts.post_date, comments.comment_content, comments.comment_owner from users inner join blog_posts on blog_posts.user_id = users.id
left join comments on comments.post_id = blog_posts.id;
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


function addNewComment(comment_owner, post_id, comment_content) {
  const values = [comment_owner, parseInt(post_id), comment_content];
  return db.query(
    "INSERT INTO comments(comment_owner,post_id, comment_content) VALUES($1, $2, $3)",
    values
  );
}

module.exports = { getAllPosts, postPost, addNewComment, getUser };
