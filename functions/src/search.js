const functions = require('firebase-functions');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();
const algoliaIndex = require('./algolia')();
const BEARER = 'SearchToken';

const validateAuthorizedToken = (req, res, next) => {
  console.log('Check if request is authorized with the correct header');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith(`${BEARER} `)) && !req.cookies.__session) {
    console.error('No valid token was passed as a Bearer token in the Authorization header.');
    res.status(403).send('Unauthorized');
    return;
  }

  if (req.headers.authorization && req.headers.authorization.startsWith(`${BEARER} `)) {
    const idToken = req.headers.authorization.split(`${BEARER} `)[1];
    console.log(`Found "Authorization" header with bearer: ${idToken}`);

    // accept any token (for the sake of this demo app)
    return next();
  }

  res.status(403).send('Unauthorized');
  return;
};

const filterMethods = (req, res, next) => {
  if (['post', 'delete'].includes(req.method.toLowerCase())) {
    next();
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

app.use(helmet());
app.use(cors);
app.use(cookieParser);
app.use(filterMethods);
app.use(validateAuthorizedToken);
app.post('/1/apps', (req, res) => {
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
app.delete('/1/apps/:id', (req, res) => {
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
