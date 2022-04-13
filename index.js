// modules
require('dotenv').config()
// express 
const express = require("express");
const {db} = require("./fb");
const cors = require("cors");

// init

// express 
const app = express();
const port = 3000;

const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true // for cookies
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

const albums = require("./routes/album")
const comments = require("./routes/comment");

app.use("/albums", albums);
app.use("/comments", comments);
app.listen(port, () => console.log(`Example app listening on port${port}!`));
