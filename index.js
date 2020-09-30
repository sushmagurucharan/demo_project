const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
session = require('express-session');
const cors = require('cors');
const router =require('./router');
const { apiConfig,messages } = require('./constants');
const {
  exceptionMiddleware,
  unknownRoutesMiddleware
} = require('./common');

var app1 = express();
app1.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true,
  maxAge  : new Date(Date.now() + 3600000), //1 Hour
  expires : new Date(Date.now() + 3600000), //1 Hour
}));
app1.use(cors({ origin: true }));
app1.use(apiConfig.ROOT_URL_APP1, router);
app1.all('*', unknownRoutesMiddleware);
app1.use(exceptionMiddleware);

var app2 = express();
app2.use(cors({ origin: true }));
app2.use(apiConfig.ROOT_URL_APP2, router);
app2.all('*', unknownRoutesMiddleware);
app2.use(exceptionMiddleware);

var app = express();
app.use('/app1',app1);
app.use('/app2',app2);

var serviceAccount = require("./permission.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:messages.databaseURL
});

exports.app1 = functions.https.onRequest(app1);
exports.app2 = functions.https.onRequest(app2);

