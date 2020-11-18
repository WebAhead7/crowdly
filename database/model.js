const db = require("./connection");

// function getAllPosts() {
//   return db
//     .query(
//       `

//       select users.username, users.id, blog_posts.text_content, blog_posts.id, blog_posts.post_date from blog_posts left join users on users.id = blog_posts.user_id order by blog_posts.post_date;
//     `
//     )
//     .then((result) => result.rows);
// }

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

function addNewComment(comment_owner, post_id, comment_content) {
  const values = [comment_owner, parseInt(post_id), comment_content];
  return db.query(
    "INSERT INTO comments(comment_owner,post_id, comment_content) VALUES($1, $2, $3)",
    values
  );
}

module.exports = { getAllPosts, postPost, addNewComment };


// select users.username, blog_posts.text_content, blog_posts.id as post_id,blog_posts.post_date, comments.comment_content from users inner join blog_posts on blog_posts.user_id = users.id
// left join comments on comments.post_id = blog_posts.id;
