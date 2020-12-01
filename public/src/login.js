const username = document.querySelector(".username");
const password = document.querySelector(".password");
const url = "https://crowdly-blog.herokuapp.com";
const login_btn = document.querySelector(".submit-field");
const form = document.querySelector("form");

login_btn.addEventListener("click", (event) => {
  login();
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

function login() {
  fetch(`/api/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((res) => {
<<<<<<< HEAD
      console.log(res);
      // if (res.statusCode !== 200) {
      //   throw new Error("faild");
      // }
      // window.location.pathname = "/newsfeed.html";
    })
    .catch((err) => {
    
=======
      return res.json();
    })
    .then((res) => {
      if (res !== false) {
        saveLogin(res[0]);
        window.location.pathname = "/";
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      alert("Please check username or password");
>>>>>>> 1f04954acf3d30caab112b8c6f904d34486bcc68
      console.log(err);
    });
}

function saveLogin(user) {
  localStorage.setItem("current_user", JSON.stringify(user));
}
