BEGIN;

DROP TABLE IF EXISTS users, blog_posts, comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email_address VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text_content TEXT,
  post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment_owner VARCHAR(255) NOT NULL,
  post_id INTEGER REFERENCES blog_posts(id),
  comment_content TEXT
);


COMMIT;