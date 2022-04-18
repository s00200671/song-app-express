// firestore
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require("./firebase-admin-key.json");


// firestore
initializeApp({
    credential: cert(serviceAccount)
});
const db = getFirestore();

exports.db = db;