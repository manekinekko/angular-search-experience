<h2 align="center" >Angular Search Experience <img src="https://circleci.com/gh/manekinekko/angular-search-experience.svg?style=svg&circle-token=105771fd560c9c0f5b5506dbe734a47cb67b083c"/></h2>

<h4 align="center"><i>Powered by <img width="80" src="https://user-images.githubusercontent.com/1699357/38993980-664e3d0a-43e5-11e8-9e8e-d99a08cc3aea.png"/></i></h4>

<p align="center">
  <img align="center"  height="700" src="https://raw.githubusercontent.com/manekinekko/angular-search-experience/master/docs/screenshots/angular-search-experience.gif?token=ABnuHVlibKQ8XUcgrnJnoiAWm4eZMroBks5a6MtcwA%3D%3D"/>
  <br>
  <a align="center" href="https://searchapp.store" target="__blank">
<img align="center" src="https://user-images.githubusercontent.com/1699357/39004007-769991ca-43fc-11e8-8fff-53fc916d34a8.png" /></a>

</p>

# Disclaimer

This reference application is using the low level Algolia search library. If you're building a similar application, please use the official [Angular InstaSearch library](https://github.com/algolia/angular-instantsearch).


# Setting up the project

## Cloning the source files

In order to download (clone) this project on your machine, you need to have `git` installed. Read more on [how to install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your system.

Once installed, open up a terminal shell and clone this repository using the following command:

```
> git clone https://github.com/sfeir-open-source/angular-search-experience.git
```

## Installing the dependencies

You will need `npm install` to install this project's dependencies. Next, using your terminal, you will need to change directory to the folder where you previously cloned this project; by default (if you copied the commad line from above) this would be `angular-search-experience`:

```
> cd angular-search-experience
> npm install
```

## Developement server

We've decided to secure the Cloud Function (this is a good practice). So, in order to request the `search` API you'll have to append an `Authorization` header to your requests. Here is the required header `Authorization: SearchToken this-is-a-fake-token`. See an example of cURL command below.

Before you start the server, you will need to add a couple of environement variables inside a .env file, in the `/functions` folder. You can use this [env template file](https://github.com/sfeir-open-source/angular-search-experience/blob/master/functions/env) as an example, and set:

- algolia_applicationid=`YOUR_ALGOLIA_APPLICATION_ID`
- algolia_apikey=`YOUR_ALGOLIA_API_KEY`


### Option 1 (recommended): Express

In order to try out the server on your localm machine, run the following command: `npm run start:backend`

### Option 2 (advanced):the backend (cloud function)

> This option requires you to be logged in to your firebase account and have access to this projet (on firebase). Only caretakers have access to the firebase project!

Another version of the backed is relying on a Serverless architecture implemented using Cloud Functions for Firebase.

This project comes with `firebase-tools` as a local dependency. This tool is a set of Firebase Command Line Interface (CLI) tools that can generate, run and deploy a Firebase project. Please note that this dependency is usually installed globally.

Also, the Firebase runtime is using an older version of Node.js: `v6.11.5`. We've included a `.nvmrc` folder under `/functions`. This special file is a configuration file used by `NVM` to easily switch to a required version of Node.js inside a specific folder. If you don't already have `NVM` installed, please read [the installation guide](https://github.com/creationix/nvm#installation).

Use `NVM` to install the required Node.js version and then use it (only inside the `/functions` folder):

```
> nvm install 6.11.5
> nvm use
```

Now that you are using Node.js `v6.11.5`, you are ready to run (ie. emulate) the `search` Cloud Function locally. For that, run `npm run start:backend:firebase`. This command will do two things:

1.  change directory to the `/functions` folder (found at the root of the project). This folder contains all the backend code.
1.  Then it will serve the `search` Cloud Function locally on `http://localhost:5000/angular-search-experience/us-central1/search`

> Important: Please note that the `search` function implements only the `POST` and `DELETE` HTTP methods, allowing you to add and delete an entity, so you will need an HTTP client, such as `cURL` or `Postman`, to be able to request the Cloud Function.


### The front-end application

At the root of the project, run `npm start` to start the front-end dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The front-end application was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Build

### Default

Run `npm run build` to build the project. The build artifacts will be stored under the `dist/angular-search-experience-browser/` directory. Use the `npm run build:prod` script for a production build.

### With server-side rendering (SSR)

This project also leverage [Angular Universal: server-side rendering (SSR)](https://angular.io/guide/universal) technique, which generates static application pages on the server for better SEO, shorter first page load and increase performance on mobile/low-powered devices.

Run `npm run build:ssr` to build the project.
- Client bundles will be stored at the `dist/angular-search-experience-browser/` directory
- Server bundles will be stored at the `dist/angular-search-experience-server/` directory
- Node.js Express server script will be stored at `dist/server.js`

After build process finished, run `npm run serve:ssr` to serve the application via location `http://localhost:4000/`.

## Deploy

### Default

We use Firebase hosting to publish the front-end application. First, we need to configure the target `normal` in `firebase.json` to the Firebase project:

```
> firebase target:apply hosting normal <resources...>
```

Then, we can deploy the new build to firebase:

```
> npm run deploy
```
The `deploy` script will build the project using `npm run build` script first, then uploading the build artifacts at `dist/angular-search-experience-browser` to Firebase hosting

> IMPORTANT: deploying to firebase requires access privilege (to the firebase project).

### With server-side rendering (SSR)

We use Firebase hosting to publish the front-end application and Firebase functions to publish the function which run the backend code. First, we need to configure the target `ssr` in `firebase.json` to the Firebase project:

```
> firebase target:apply hosting ssr <resources...>
```

Next, we need to install packages for Firebase functions in `functions` directory:

```
> npm run install:functions
```

Then, we proceed to build the project in SSR mode:

```
> npm run build:ssr:hosting
```
The script will build both the client and server bundles similar to [build with server-side rendering](#build), then attempt to copy the build artifacts to `dist/public` and `functions/dist` directories for uploading to Firebase.

To upload the client bundles to Firebase hosting, run:

```
> npm run deploy:ssr:hosting
```

To upload the backend function to Firebase functions, run:

```
> npm run deploy:ssr:functions
```

> IMPORTANT: deploying to firebase requires access privilege (to the firebase project).

**Relevance project structure to build and deploy the project is listed as below:**

```
angular-search-experience
  |
  +- .firebaserc   # Contains Firebase projects configuration
  |
  +- firebase.json  # Describe property for Firebase projects
  |
  +- package.json   # npm package file describing project scripts and dependencies
  |
  +- node_modules/   # directories where dependencies (declared in `./package.json`)
  |                  # are installed
  |
  +- server.ts    # TypeScript file for Express server configuration
  |               # to run locally, will be transpiled to `dist/server.js`
  |
  +- server.tsconfig.json   # Configuration file for transpiled `server.ts` file
  |
  +- dist/
  |   |
  |   +- angular-search-experience-browser/  # Contains the application to be rendered on browser
  |   |                                      # This directory will also be uploaded to Firebase
  |   |                                      # by default (in `normal` target)
  |   |
  |   +- angular-search-experience-server/   # Contains the application to be rendered on server for SSR
  |   |
  |   +- public/   # Contains the client bundles to be uploaded
  |   |            # to Firebase hosting in `ssr` target
  |   |
  |   +- server.js   # Contains the Express server script to be run locally
  |
  +- functions/
      |
      +- package.json   # npm package file describing Cloud Functions code
      |
      +- node_modules/   # directories where dependencies (declared in `./package.json`)
      |                  # are installed
      |
      +- dist/
      |   |
      |   +- browser/  # Contains the application to be rendered on browser
      |   |            # and upload to Firebase functions
      |   |
      |   +- server/   # Contains the application to be rendered on server
      |                # and upload to Firebase functions
      +- src/
          |
          +- server-ssr.js   # Contains Express server function to be executed
                             # on Firebase functions
```

# Production environments

## Backend

The production endpoints (cloud function) are available on:
1. POST: https://searchapp.store/api/1/apps
2. DELETE: https://searchapp.store/api/1/apps/:id

In order to request the production Cloud Function, you can use this cURL commands:

### Adding a new entry to Algolia's index


```
> curl -H "Authorization: SearchToken this-is-a-fake-token" -H "Content-Type: application/json" -X POST -d '{}' https://searchapp.store/api/1/apps

{"createdAt":"2018-04-19T13:17:10.343Z","taskID":29343382,"objectID":"10788302"}
```

> NOTE: we don't validate the `application` object on purpose.

### Deleting an entry from Algolia's index

```
> curl -H "Authorization: SearchToken this-is-a-fake-token" -X DELETE https://searchapp.store/api/1/apps/10788302

{"deletedAt":"2018-04-19T13:30:42.190Z","taskID":29353102,"objectID":"10788302"}
```

## Front-end

The production app is available on: https://searchapp.store. See the available features below.

# Architecture and available features (UI)

## Component Architecture

![](https://raw.githubusercontent.com/manekinekko/angular-search-experience/master/src/assets/images/angular-search-experience-composition.png?token=ABnuHfcLQ6jyPEkiaMdf0qrnWOpnLv_Bks5a4ibLwA%3D%3D)


1. Component: `<app-search></app-search>`
2. Component: `<app-search-input></app-search-input>` 
3. Component: `<app-category></app-category>`
4. Component: `<app-search-result></app-search-result>` 
5. Component: `<mat-nav-list></mat-nav-list>`
6. Directive: `[appRating]`
7. Pipe: `freePriceLabel`

Read more about the API documentation here: https://sfeir-open-source.github.io/angular-search-experience/index.html


## Features

### Search box

<img src="https://user-images.githubusercontent.com/1699357/39013975-4dfb5358-4419-11e8-8335-855b2bdc29d7.gif" width="800"/>


### Search results with highlights

<img src="https://user-images.githubusercontent.com/1699357/39014284-3fc1aaac-441a-11e8-874b-9d903ae7def3.gif" width="800"/>

### Sort options

<img src="https://user-images.githubusercontent.com/1699357/38996538-b4bbca74-43eb-11e8-924d-852094e963fa.png" width="800"/>


### Facets options

<img src="https://user-images.githubusercontent.com/1699357/38996647-ede7a5de-43eb-11e8-8b16-9577ec017047.png" width="800"/>


### Lazy loading


<img src="https://user-images.githubusercontent.com/1699357/38998317-9817e1d8-43ef-11e8-958d-2601e233e95b.gif" width="800"/>


### Deeplinks

<img src="https://user-images.githubusercontent.com/1699357/39011672-6aca5576-4412-11e8-88de-a55dc9325f32.gif" width="800"/>



## DANGER ZONE: EASTER EGG AHEAD!

<details>
  <summary>Easter Egg inside!!</summary>
  <p>
    We have included a chatbot this application. It can help you search for applications using your voice. Just ask it to <b>help you search for a weather app</b> or <b>find a game</b>.
    </p>

  To enable the bot, you will need to turn on your microphone and speakers. The, just click 6 times on the application logo (the header).

  <b>NOTE: The implementation of this bot is experimental (and for fun!) and was not trained against a large set of users' utterances!</b>
</details>



## Known issues

#### Found incompatible module

##### error dialogflow-fulfillment@0.3.0-beta.2: The engine "node" is incompatible with this module. Expected version "~8.0".

```
npm run install v1.5.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
error dialogflow-fulfillment@0.3.0-beta.2: The engine "node" is incompatible with this module. Expected version "~8.0".
error An unexpected error occurred: "Found incompatible module".
info If you think this is a bug, please open a bug report with the information provided in "/Users/vvo/Dev/Algolia/angular-search-experience/functions/npm run-error.log".
info Visit https://npm runpkg.com/en/docs/cli/install for documentation about this command.
```

Workaround:
- Run `nvm use 8.0` inside the `/functions` folder.
- Run `npm install`.
- Run `cd ..` then `npm run start:backend`.
