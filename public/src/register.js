const form = document.querySelector('form')
const pass = document.querySelector("#pass")
const cPass = document.querySelector("#cPass")
const msg = document.querySelector("#msg")
const formDiv = document.querySelector("#formDiv")
const redirDiv = document.querySelector("#redirDiv")

// Server url to make a request
const url = "http://localhost:3000"

/***FUNCTION FOR REGISTERING USERS***/
function registerUser(data) {
    fetch(`${url}/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) throw new Error
        console.log("RESPONSE IS --> ", res)
        formDiv.style.display = 'none'
        redirDiv.style.display = 'block'
    }).catch(err => console.error(err))

}

// On Submitting, we check if the passwords match and only then we make a post request and the redirection to the newsfeed page
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (pass.value.length >= 1 && pass.value === cPass.value) {
        // object containing all the data from the form
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData)
        console.log(data)
        // Registering a user by sending an API POST REQUEST to the server
        // using a function
        registerUser(data);
    } else {
        if (pass.value !== cPass.value) {
            msg.textContent = "Passwords don't match"
        }
        else if (pass.value.length < 1) {
            msg.textContent = "Password is too short"
        }
    }
})

