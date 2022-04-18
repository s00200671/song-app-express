const functions = require("firebase-functions");

// modules
// express 
const express = require("express");
const {db} = require("./fb");
const cors = require("cors");

// init

// express 
const app = express();
const port = 3000;

const corsOptions = {
    origin: "https://album-song-app.herokuapp.com",
    credentials: true // for cookies
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const albums = require("./routes/album")
const comments = require("./routes/comment");

app.use("/albums", albums);
app.use("/comments", comments);

exports.widgets = functions.https.onRequest(app);
