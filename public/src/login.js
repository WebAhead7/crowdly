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
    .then((res) => {
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
      console.log(err);
    });
}

function saveLogin(user) {
  localStorage.setItem("current_user", JSON.stringify(user));
}
