const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./config");

const db = require("knex")({
  client: "pg",
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
  },
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.route("/api/users").post(async (req, res, next) => {
  try {
    const { email, firstname } = req.body;
    // ... validate inputs here ...
    const userData = { email, firstname };

    const result = await db("users").returning("id").insert(userData);
    const id = result[0];
    res.status(201).send({ id, ...userData });
  } catch (err) {
    console.log(`Error: Unable to create user: ${err.message}. ${err.stack}`);
    return next(err);
  }
});

app.route("/api/users").get((req, res, next) => {
  db("users")
    .select("id", "email", "firstname")
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(`Unable to fetch users: ${err.message}. ${err.stack}`);
      return next(err);
    });
});

try {
  console.log("Starting web server...");

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Server started on: ${port}`));
} catch (error) {
  console.error(error.stack);
}
