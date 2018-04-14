const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();

const FAKE_TOKEN = 'this-is-a-fake-token';
const BEARER = 'SearchToken';

const validateAuthorizedToken = (req, res, next) => {
  console.log('Check if request is authorized with the correct Agent');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith(`${BEARER} `)) && !req.cookies.__session) {
    console.error('No valid token was passed as a Bearer token in the Authorization header.');
    res.status(403).send('Unauthorized');
    return;
  }

  if (req.headers.authorization && req.headers.authorization.startsWith(`${BEARER} `)) {
    console.log('Found "Authorization" header');
    const idToken = req.headers.authorization.split(`${BEARER} `)[1];

    // accept any token (for the sake of this demo app)
    if (idToken === FAKE_TOKEN) {
      return next();
    }

  }

  res.status(403).send('Unauthorized');
  return;
};

app.use(cors);
app.use(cookieParser);
app.use(validateAuthorizedToken);
app.post('/api/1/apps', (req, res) => {
  res.send(`Added ${req.body}`);
});
app.delete('/api/1/apps/:id', (req, res) => {
  res.send(`Deleting ${req.id}`);
});

exports.search = functions.https.onRequest(app);
