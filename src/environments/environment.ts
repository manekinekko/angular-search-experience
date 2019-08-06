// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mock: {
    url: 'assets/data/data.json'
  },
  algolia: {
    applicationId: 'UKIVLRH85G',
    searchApiKey: '208b30b19b8def35abe4eba171bcb5a2',
    indexName: 'applications'
  },
  dialogflow: {
    accessToken: 'e7bb984fbcbf46599df262d7f4e1a0ce'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
