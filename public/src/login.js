const username = document.querySelector(".username");
const password = document.querySelector(".password");
const url = "http://localhost:3000";
const login_btn = document.querySelector(".submit-field");
const form = document.querySelector("form");

login_btn.addEventListener("click", (event) => {
  login();
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

function login() {
  fetch(`/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      // if (res.statusCode !== 200) {
      //   throw new Error("faild");
      // }
      // window.location.pathname = "/newsfeed.html";
    })
    .catch((err) => {
    
      console.log(err);
    });
}
