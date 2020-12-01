// The data is send to the back-end here from the front end in that formation: 
// var data = {username: "Lujain", firstName: "lujain", lastName: "au", email: "lujain.abdallatif@mail.huji.ac.il", pass : "1234", cPass: "1234"} --- stringify
// THUS; we first need to parse it, and to extract the data
// Then after; we need to search for the username and the email in the database if they exict and return a response accordingly

const model = require('../database/model')


function register(request, response) {
  let body = ""
  request.on("data", chunk => {
    body += chunk
  })
  request.on("end", () => {
    body = JSON.parse(body)

    model.getUsernameEmail(body.username, body.email)
      .then(dbRes => {
        let rows = dbRes.rows
        if (rows.length === 0) {
          model.addUser(body)
            .then(() => {
              response.writeHead(201, { "content-type": "text/plain" })
              response.end("Successful Submition")
            })
            .catch(err => console.error("Didn't add to the database"))
        } else {

          let username = rows.map(users => users.username)
          let email = rows.map(users => users.email)

          if (username.length) {
            response.writeHead(406, { "content-type": "text/plain" })
            response.end("username already exists")
          } else if (email.length) {
            response.writeHead(406, { "content-type": "text/plain" })
            response.end("email already exists")
          }
        }

      }
      ).catch(err => {
        console.log(err);
      });

  })


  // Now we are going to make a query in model to fetch us the username and email, in order to check if they are in the database and returning a response accordingly
}

// requiring path and fs to read register.html file and 

module.exports = register;
