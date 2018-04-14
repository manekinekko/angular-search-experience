const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();

const algoliaIndex = require('./algolia');

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
  console.log(`Adding: ${JSON.stringify(req.body)}`);

  algoliaIndex
    .addObject(req.body)
    .then(record => {
      console.log(`Added: ${JSON.stringify(req.body)}`);

      res.send(record);
    })
    .catch(error => {
      console.error(error);
      
      res.status(500).send({
        error
      });
    });
});
app.delete('/api/1/apps/:id', (req, res) => {
  const objectId = req.params.id;

  console.log(`Deleting: ${objectId}`);

  if (objectId) {
    algoliaIndex
      .deleteObject(objectId)
      .then(record => {
        console.log(`Deleted: ${objectId}`);

        res.send(record);
      })
      .catch(error => {
        console.error(error);

        res.status(500).send({
          error
        });
      });
  } else {
    res.status(500).send({
      error: `Invalid ObjectID found in the URL. Got: "${objectId}"`
    });
    return;
  }
});

exports.search = functions.https.onRequest(app);
