'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const algoliaIndex = require('./algolia');

process.env.DEBUG = 'dialogflow:debug';

const shuffle = array =>
  array
    ? array
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1])
    : [];

const hideLink = link => `<<${link}>>`;

exports.bot = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  const searchByKeyword = agent => {
    const category = agent.parameters && agent.parameters.category;

    if (category !== '') {
      console.log(`found category "${category}"`);

      return algoliaIndex()
        .search({
          query: '',
          facetFilters: [`category:${category}`]
        })
        .then(results => {
          console.log(`algolia results`, JSON.stringify(results.hits));

          let apps = shuffle(results.hits);
          apps = apps.slice(0, 3);

          if (apps.length === 0) {
            agent.add(`Sorry, there is no applications in category ${category}. Please try another search.`);
          } else if (apps.length === 1) {
            const app = apps.pop();
            const aog = agent.conv();

            agent.add(
              `I found an app in category ${category} called ${app.name}. Would you like to open this application's page?${hideLink(
                app.link
              )}`
            );
          } else {
            const last = apps.pop();
            agent.add(
              `I found ${results.nbHits} applications in category ${category}. Here are ${apps.length + 1} of them: ${apps
                .map(app => app.name)
                .join(', ')} and ${last.name}.`
            );
          }

          return true;
        })
        .catch(error => {
          console.error(error);
          agent.add(`Sorry, something went wrong. Please try again.`);
          return false;
        });
    } else {
      return algoliaIndex('applications_by_rating_desc')
        .search('', {
          hitsPerPage: 5
        })
        .then(results => {
          const apps = shuffle(results.hits);
          const app = apps[0];

          console.log(`algolia result`, JSON.stringify(app));

          if (app) {
            agent.add(
              `One of the most rated apps is ${app.name}, in the ${
                app.category
              } category. Would you like to open this app's page?${hideLink(app.link)}`
            );
          } else {
            agent.add(`Sorry, I could not find any app that matches your criterion. Could you be more specific?`);
          }
          return true;
        })
        .catch(error => {
          console.error(error);
          agent.add(`Sorry, something went wrong. Please try again.`);
          return false;
        });
    }
  };

  let intentMap = new Map();
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('search-by-keyword', searchByKeyword);
  agent.handleRequest(intentMap);
});
