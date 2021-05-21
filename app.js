const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  const firstName = req.body.FirstName;
  const secondName = req.body.SecondName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName
      }
    }]
  }
  const jsonData = JSON.stringify(data);
  const url = " https://us1.api.mailchimp.com/3.0/lists/6385fc59ae";
  const options = {
    method: "POST",
    auth: "Soumyadeep:7c2f8c5e45b29b7ccd04da0d43eb9bf8-us1"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200)
      res.sendFile(__dirname + "/success.html");
    else
      res.sendFile(__dirname + "/failure.html");

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})


app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 5000, function() {
  console.log("Server is running on port: 5000");
})

//Unique list id
//6385fc59ae

//API KEY
//7c2f8c5e45b29b7ccd04da0d43eb9bf8-us1