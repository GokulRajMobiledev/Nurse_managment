const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const db = require("./config/db");
const cors = require("cors");


app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(cookie());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./Routes/routes"));

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL CONNECTED");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  `server renning on ${port}`;
});
