require('dotenv').config();

const functions = require('firebase-functions');
const algolia = functions.config().algolia;
const applicationid = (algolia && algolia.applicationid) || process.env.algolia_applicationid;
const apikey = (algolia && algolia.apikey) || process.env.algolia_apikey;

const algoliasearch = require('algoliasearch');
const client = algoliasearch(applicationid, apikey);
module.exports = (indexName = 'applications') => client.initIndex(indexName);
