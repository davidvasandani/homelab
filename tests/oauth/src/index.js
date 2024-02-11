require("dotenv").config();
const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
const formdata = require("form-data");

app.use(express.static("static"));

app.get("/", (req, res) => {
  console.log("TOKEN: ", req.query.token);
  var token = req.query.token;
  res.json({
    token,
  });
  res.sendFile(path.join(__dirname, "static/index.html"));
});

app.get("/auth", (req, res) => {
  res.redirect(
    `https://dev.vasandani.me/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=https%3A//auth.dev.vasandani.me/oauth-callback/&response_type=code&scope=read+write`
  );
});

app.get("/oauth-callback", ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    grant_type: "authorization_code",
    scope: "read%20write%20follow",
    redirect_uri: "https://auth.dev.vasandani.me/oauth-callback/",
    code,
  };
  const opts = { headers: { accept: "application/json" } };
  axios
    .post("https://remote.vasandani.me/oauth/token", body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      // eslint-disable-next-line no-console
      console.log("My token:", token);
      res.redirect(`https://auth.dev.vasandani.me/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

// add a route to post a toot using the token as an authorization header
// app.get("/toot", (req, res) => {
//   console.log("My token:", tokenlist);
//   const form = new formdata();
//   form.append("status", "Toot with node");
//   const opts = {
//     headers: {
//       accept: "application/json",
//       authorization: ("Bearer ", tokenlist),
//     },
//   };
//   axios // eslint-disable-next-line no-console
//     .post("https://remote.vasandani.me/api/v1/statuses/", form, opts)
//     .then((_res) => _res)
//     // console.log("response:", _res);
//     // })
//     .catch((err) => res.status(500).json({ err: err.message }));
// });

app.listen(3002);
// eslint-disable-next-line no-console
console.log("App listening on port 3002");
