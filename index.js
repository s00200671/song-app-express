// modules

// express 
const express = require("express");
// firestore
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require("./firebase-admin-key.json");

// init

// express 
const app = express();
const port = 3000;
// firestore
initializeApp({
    credential: cert(serviceAccount)
});
const db = getFirestore();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const docRef = db.collection('albums').doc('alovelace');

app.listen(port, () => console.log(`Example app listening on port${port}!`));
