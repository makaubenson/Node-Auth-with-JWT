const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      console.log(err, err.message);
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post Created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  //Mock User
  const user = {
    id: 1,
    username: "benson",
    email: "bensonmakau2000@gmail.com",
  };
  //send user as payload,
  jwt.sign({ user: user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      //   token: token,
      token,
    });
  });
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

// function to Verify Token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];
  //Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //split at the space (Bearer <access_token>)
    const bearer = bearerHeader.split(" ");
    //Get token from arrays
    const bearerToken = bearer[1];

    //Set the token
    req.token = bearerToken;

    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server started on port 5000!"));
