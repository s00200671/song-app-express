// modules
require('dotenv').config()
// express 
const express = require("express");
const {db} = require("./fb");

// init

// express 
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const albums = require("./routes/album")
const comments = require("./routes/comment");

app.use("/albums", albums);
app.use("/comments", comments);
app.listen(port, () => console.log(`Example app listening on port${port}!`));
