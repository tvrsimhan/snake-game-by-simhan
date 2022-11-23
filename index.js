//Import the necessary libraries/declare the necessary objects
const path = require("path");
const express = require("express");
const app = express();
const lb = require("./models/leaderboard.js");
const ejs = require("ejs");
const mongoose = require("mongoose");
const res = require("express/lib/response");

const dbURI =
  "mongodb+srv://snakegameadmin:V8GrStH7KH3KGrON@snake-game.7gudt.mongodb.net/snakescores?retryWrites=true&w=majority";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

mongoose
  .connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("Connected to Mongo"))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.render("game");
});

app.post("/snakeGame", function (request, response) {
  response.send("POST");
  const scores = new lb(request.body);
  scores
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/scores", function (request, response) {
  lb.find((err, document) => {
    response.render("score", { lbContents: document });
  }).sort({ score: "desc" });
});

//Start the server and make it listen for connections on port 5000
app.listen(process.env.PORT || 5000);
