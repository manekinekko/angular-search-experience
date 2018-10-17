require("zone.js/dist/zone-node");
const { enableProdMode } = require("@angular/core");
const { renderModuleFactory } = require("@angular/platform-server");
// Express Engine
const { ngExpressEngine } = require("@nguniversal/express-engine");
// Import module map for lazy loading
const { provideModuleMap } = require("@nguniversal/module-map-ngfactory-loader");
const express = require("express");
const functions = require("firebase-functions");
const path = require("path");
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
// Express server
const app = express();
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main');
const document = require('fs')
  .readFileSync(path.resolve(__dirname, '../dist/browser/index.html'), 'utf8')
  .toString();
// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));
app.set('view engine', 'html');
// All regular routes use the Universal engine
app.get('**', (req, res) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: req.path,
    document: document
  }).then(html => {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    res.status(200).send(html);
  });
});
exports.ssrApp = functions.https.onRequest(app);
