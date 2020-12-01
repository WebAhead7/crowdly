const newsFeed = document.querySelector("#news_feed");
const post_btn = document.querySelector("#post_btn");
const post_content = document.querySelector("#post_content");
const comment_btn = document.querySelector("#comment_btn");
const add_comment_section = document.querySelector(".add_comment");
const allCommentsButtons = document.querySelectorAll('.comments_buttons');
const allCommentsInputs = document.querySelectorAll('.comments_posts')
const feed_Url = "http://localhost:3000/newsfeed";
const post_Url = "http://localhost:3000/newpost";

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

function updateDom(feed_array) {
  newsFeed.innerHTML = "";
  feed_array.forEach((post) => {
    if (post.text_content) {
      const div = document.createElement("div");
      div.classList.add("post");
      div.type = post.post_id;
      div.innerHTML = `
          <div class="post_header">
            <span>${post.username}</span><span>${post.date}</span>
          </div>
          <div class="content">
            <p>
              ${post.text_content}
            </p>
          </div>
          <div class="btns">
            <button>Like</button>
            <button class="comments_buttons" id ="comment-${post.post_id}">Comment</button>
            <button>Share</button>
          </div>
          <div class="comment">
            <div class="all_comments">
            ${generateComments(post.comments)}
            </div>
            <div class="add_comment">
              <textarea class="comments_posts" rows="2" id="post-${post.post_id}"> </textarea>
              <button id="add_comment_btn" >Add comment</button>
            </div>
          </div>
              `;
      
      newsFeed.appendChild(div);
    }
  });
}

function generateComments(arr){
return arr.map(comment=> {
  return`<div class="comments">
  <span class="user_comment">${comment.comment_owner}</span
  ><span
    >${comment.comment_content}</span
  >
</div>`
}).join('');
}

post_btn.addEventListener("click", (e) => {
  console.log(post_content.value);
  addNewPost("1", post_content.value);
});

allCommentsButtons.forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    const id = e.target.id.split('-')[1];
    console.log(id);
    const textArea = document.querySelector(`.post-${id}`);
    textArea.classList.toggle("show_element");
  })
})


comment_btn.addEventListener("click", (e) => {
  add_comment_section.classList.toggle("show_element");
});



getNewsFeed();
