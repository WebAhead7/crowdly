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

function addNewComment(user_id, post_id, comment_content) {
    const values = [parseInt(user_id), parseInt(post_id), comment_content];
    return db.query(
        "INSERT INTO comments(user_id,post_id, comment_content) VALUES($1, $2, $3)",
        values
    );
}

function getUsernameEmail(username, email) {
    console.log('USERNAME AND EMAIL INSIDE getUsernameEmail')
    console.log(username, email)
    return db.query(`SELECT username, email_address
    FROM users
    WHERE EXISTS
    (SELECT username,email_address FROM users  WHERE users.username = $1 OR email_address = $2 )
;`, [username, email])

}

function addUser(data) {
    return db.query(`
    INSERT INTO users (username, first_name, last_name, email_address, user_password)
    VALUES ($1, $2, $3, $4, $5)`, [data.username, data.firstName, data.lastName, data.email, data.pass]
    )
}

module.exports = { getAllPosts, postPost, addNewComment, getUsernameEmail, addUser };
