/**
 * Author cumaniar
 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");

// Controller imports
const signIn = require("./controllers/signin");
const register = require("./controllers/register");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

const db = knex({
  client: "pg",
  connection: {
    connectString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const data = db
    .select("*")
    .from("users")
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Could not connect!"));
});

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImageCount(req, res, db, bcrypt);
});

app.post("/face_url", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 8000, (data, err) => {
  if (err) console.log("Something went wrong! ", err);
  console.log(`Server started on PORT  ${process.env.PORT}`);
});
