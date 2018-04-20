'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const algoliaIndex = require('./algolia');

process.env.DEBUG = 'dialogflow:debug';

exports.bot = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  const searchByKeyword = agent => {
    const topic = agent.parameters && agent.parameters.topic;

    if (topic) {
      console.log(`found topic ${topic}`);

      return algoliaIndex()
        .search(topic)
        .then(result => {
          const apps = result.hits.slice(0, 3);
          console.log(`algolia results`, JSON.stringify(apps));

          if (apps.length === 0) {
            agent.add(`Sorry, there is no applications related to ${topic}. Please try another search.`);
          } else if (apps.length === 1) {
            const app = apps.pop();
            agent.setContext({ name: app.name, lifespan: 4, parameters: { url: app.url } });
            agent.add(`I found one application about ${topic}: ${app.name}. Would you like to visit this app's page on the AppStore?`);
          } else {
            const last = apps.pop();
            agent.add(
              `I found ${result.hits.length} applications about ${topic}. Here are ${apps.length} of them: ${apps
                .map(app => app.name)
                .join(', ')} and ${last}.`
            );
          }

          return true;
        })
        .catch(error => {
          console.error(`algolia error ${error}`);
          agent.add(`Sorry, I could not find any application. Please try again.`);
          return false;
        });
    } else {
      return algoliaIndex('applications_by_rating_desc')
        .search()
        .then(result => {
          const app = result.hits[0];

          console.log(`algolia result`, JSON.stringify(app));

          if (app) {
            agent.setContext({ name: app.name, lifespan: 4, parameters: { url: app.url } });
            agent.add(
              `The most rated app is ${app.name}, in the ${app.category} category. Would you like to visit this app's page on the AppStore?`
            );
          } else {
            agent.add(`Sorry, I could not find any app that matches your critea. Could you be more specific?`);
          }
          return true;
        })
        .catch(error => {
          console.error(`algolia error ${error}`);
          agent.add(`Sorry, I could not find any application. Please try again.`);
          return false;
        });
    }
  };

  let intentMap = new Map();
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('search-by-keyword', searchByKeyword);
  agent.handleRequest(intentMap);
});
