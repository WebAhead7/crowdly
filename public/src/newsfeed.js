const newsFeed = document.querySelector("#news_feed");
const post_btn = document.querySelector("#post_btn");
const post_content = document.querySelector("#post_content");
const logout_btn = document.querySelector("#user_logout");
const feed_Url = "http://localhost:3000/newsfeed";
const post_Url = "http://localhost:3000/newpost";
const comment_Url = "http://localhost:3000/addcomment";

function isLoggedin() {
  const isUserLoggedIn = localStorage.getItem("current_user");

  if (!isUserLoggedIn) {
    window.location.pathname = "/loginpage";
  } else {
    getNewsFeed();
  }
}

function userLogout() {
  localStorage.removeItem("current_user");
  isLoggedin();
}

function getNewsFeed() {
  const allPosts = fetch(feed_Url);
  allPosts
    .then((results) => results.json())
    .then((response) => {
      updateDom(response);
    });
}

function addNewPost(id, content) {
  const data = { user_id: id, text_content: content };
  console.log(data);
  const newPost = fetch(post_Url, {
    method: "POST",
    headers: {
      text_content: "application/json",
    },
    body: JSON.stringify(data),
  });
  newPost
    .then((results) => results.json())
    .then((response) => {
      getNewsFeed();
    })
    .catch((e) => {
      console.log(e);
    });
}

function addNewComment(username, postId, content) {
  const data = {
    comment_owner: username,
    post_id: postId,
    comment_content: content,
  };

  const newComment = fetch(comment_Url, {
    method: "POST",
    headers: {
      text_content: "application/json",
    },
    body: JSON.stringify(data),
  });
  newComment
    .then((results) => results.json())
    .then((response) => {
      if (response) {
        injectComment(data);
      } else {
        throw new Error();
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function updateDom(feed_array) {
  commentsRemoveListener();
  newsFeed.innerHTML = "";
  feed_array.forEach((post) => {
    if (post.text_content) {
      const div = document.createElement("div");
      div.classList.add("post");
      div.type = post.post_id;
      div.innerHTML = `
          <div class="post_header">
            <span>${post.username}</span><span>${post.post_date}</span>
          </div>
          <div class="content">
            <p>
              ${post.text_content}
            </p>
          </div>
          <div class="btns">
            <button>Like</button>
            <button class="comments_btns" id="comment_btn-${
              post.post_id
            }">Comment</button>
            <button>Share</button>
          </div>
          <div class="comment">
            <div class="all_comments-${post.post_id}">
            ${generateComments(post.comments)}
            </div>
            <div class="add_comment" id="comment_input-${post.post_id}">
              <textarea rows="2" id="post_content-${post.post_id}"> </textarea>
              <button class="add_comment_btn_fn" id="add_comment_btn-${
                post.post_id
              }">Add comment</button>
            </div>
          </div>
              `;

      newsFeed.appendChild(div);
    }
  });

  commentsListener();
  setInnerCommentLister();
}

function generateComments(arr) {
  // console.log(object);
  return arr
    .map((comment) => {
      let content = `<div class="comments">
        <span class="user_comment">${comment.comment_owner}</span
        ><span
          >${comment.comment_content}</span
        >
      </div>`;
      if (comment.comment_owner !== null && comment.comment_content !== null) {
        return content;
      } else {
        return "";
      }
    })
    .join("");
}
isLoggedin();

function injectComment(comment) {
  const { comment_owner, post_id, comment_content } = comment;
  console.log(post_id);
  const commentContainer = document.querySelector(`.all_comments-${post_id}`);

  const div = document.createElement("div");
  div.classList.add("comments");
  let content = `
        <span class="user_comment">${comment_owner}</span
        ><span
          >${comment_content}</span
        >`;
  div.innerHTML = content;
  commentContainer.prepend(div);
  const post_content = document.querySelector(`#post_content-${post_id}`);
  const commentInput = document.querySelector(`#comment_input-${post_id}`);
  post_content.value = "";
  commentInput.classList.toggle("show_element");
}

post_btn.addEventListener("click", (e) => {
  const user_details = localStorage.getItem("current_user");
  const userId = JSON.parse(user_details).id;
  console.log(userId);
  console.log(post_content.value);
  addNewPost(userId, post_content.value);
});

logout_btn.addEventListener("click", (e) => {
  userLogout();
});

function commentsListener() {
  document.querySelectorAll(".comments_btns").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.id.split("-")[1];
      const commentInput = document.querySelector(`#comment_input-${id}`);
      commentInput.classList.toggle("show_element");
    });
  });
}

function commentsRemoveListener() {
  document.querySelectorAll(".comments_btns").forEach((btn) => {
    btn.removeEventListener("click", () => {});
  });

  document.querySelectorAll(".add_comment_btn_fn").forEach((btn) => {
    btn.removeEventListener("click", () => {});
  });
}

function setInnerCommentLister() {
  const current_user = localStorage.getItem("current_user");
  const user = JSON.parse(current_user).username;
  document.querySelectorAll(".add_comment_btn_fn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.id.split("-")[1];
      const post_content = document.querySelector(`#post_content-${id}`);
      addNewComment(user, id, post_content.value);
    });
  });
}
