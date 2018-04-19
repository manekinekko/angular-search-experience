<h1 align="center" >Angular Search Experience (by <img width="100" src="https://user-images.githubusercontent.com/1699357/38993980-664e3d0a-43e5-11e8-9e8e-d99a08cc3aea.png"/>)</h1>
<p align="center">
  This application is LIVE and available at this URL: <a href="https://angular-search-experience.firebaseapp.com">angular-search-experience.firebaseapp.com</a>
  <br/>
  <img align="center"  height="600" src="https://raw.githubusercontent.com/manekinekko/angular-search-experience/master/docs/screenshots/angular-search-experience.gif?token=ABnuHTtZsIzUFMSAiUKBwO7FEU507Qnqks5a3mQSwA%3D%3D"/>
</p>

# Setting up the project

## Cloning the source files

In order to download (clone) this project on your machine, you need to have `git` installed. Read more on [how to install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your system.

Once installed, open up a terminal shell and clone this repository using the following command:

```
> git clone https://github.com/manekinekko/angular-search-experience.git
```

## Installing the dependencies

You will need `yarn` to install this project's dependencies. If you don't have `yarn` installed, here is [the official documentation](https://yarnpkg.com/lang/en/docs/install/#mac-stable). Next, Using your terminal, you will need to change directory to the folder where you previously cloned this project; by default (if you copied the commad line from above) this would be `angular-search-experience`:

```
> cd angular-search-experience
> yarn
```

## Developement server

### the backend (cloud function)
 
The backed is relying on a Serverless architecture implemented using Cloud Functions for Firebase. 

This project comes with `firebase-tools` as a local dependency. This tool is a set of Firebase Command Line Interface (CLI) tools that can generate, run and deploy a Firebase project. Please note that this dependency is usually installed globally.

Also, the Firebase runtime is using an older version of Node.js: `v6.11.5`. We've included a `.nvmrc` folder under `/functions`. This special file is a configuration file used by `NVM` to easily switch to a required version of Node.js inside a specific folder. If you don't already have `NVM` installed, please read [the installation guide](https://github.com/creationix/nvm#installation).

Use `NVM` to install the required Node.js version and then use it (only inside the `/functions` folder):

```
> nvm install 6.11.5
> nvm use
```

Now that you are using Node.js `v6.11.5`, you are ready to run (ie. emulate) the `search` Cloud Function locally. For that, run `yarn start:backend`. This command will do two things:

1.  change directory to the `/functions` folder (found at the root of the project). This folder contains all the backend code.
1.  Then it will serve the `search` Cloud Function locally on `http://localhost:5000/angular-search-experience/us-central1/search`

> Important: Please note that the `search` function implements only the `POST` and `DELETE` HTTP methods, allowing you to add and delete an entity, so you will need an HTTP client, such as `cURL` or `Postman`, to be able to request the Cloud Function.


We've decided to secure the Cloud Function (this is a good practice). So, in order to request the local `search` Cloud Function, you'll have to append an `Authorization` header to your requests. Here is the required header `Authorization: SearchToken this-is-a-fake-token`. See an example of cURL command below.

### the front-end application

At the root of the project, run `yarn start` to start the front-end dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The front-end application was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0-rc.4.

## Build

Run `yarn build` to build the project. The build artifacts will be stored under the `dist/angular-search-experience/` directory. Use the `yarn build:prod` script for a production build.

## Deploy

We use Firebase hosting to publish the front-end application. Before deploying a new version, we need to build a production package using the following command:

```
> yarn build
```

Then, we can deploy the new build to firebase:

```
> yarn deploy
```

> IMPORTANT: deploying to firebase requires access privilege (to the firebase project).


# Production environments

## Backend

The production endpoints (cloud function) are available on: 
1. POST: https://us-central1-angular-search-experience.cloudfunctions.net/search/api/1/apps
2. DELETE: https://us-central1-angular-search-experience.cloudfunctions.net/search/api/1/apps/:id

In order to request the production Cloud Function, you can use this cURL commands:

### Adding a new entry to Algolia's index


```
> curl -H "Authorization: SearchToken this-is-a-fake-token" -H "Content-Type: application/json" -X POST -d '{}' https://us-central1-angular-search-experience.cloudfunctions.net/search/api/1/apps

{"createdAt":"2018-04-19T13:17:10.343Z","taskID":29343382,"objectID":"10788302"}
```

> NOTE: we don't validate the `application` object on purpose.

### Deleting an entry from Algolia's index

```
> curl -H "Authorization: SearchToken this-is-a-fake-token" -X DELETE https://us-central1-angular-search-experience.cloudfunctions.net/search/api/1/apps/10788302

{"deletedAt":"2018-04-19T13:30:42.190Z","taskID":29353102,"objectID":"10788302"}
```

## Front-end

The production app is available on: https://angular-search-experience.firebaseapp.com. See the available features below.

# Architecture and available features (UI)

## Search box

![image](https://user-images.githubusercontent.com/1699357/38996307-3d26be2e-43eb-11e8-83e1-96e44cf78579.png?100)


## Search results

![image](https://user-images.githubusercontent.com/1699357/38996372-5a99d810-43eb-11e8-8ce7-41b59c9722cb.png)


## Sort options

![image](https://user-images.githubusercontent.com/1699357/38996538-b4bbca74-43eb-11e8-924d-852094e963fa.png)


## Facets options

![image](https://user-images.githubusercontent.com/1699357/38996647-ede7a5de-43eb-11e8-8b16-9577ec017047.png)


## Lazy loading

![lazy-loading](https://user-images.githubusercontent.com/1699357/38998317-9817e1d8-43ef-11e8-958d-2601e233e95b.gif)


## Deeplinks

![deeplink](https://user-images.githubusercontent.com/1699357/38998031-0ae94bc6-43ef-11e8-86a6-c92410b3e80c.gif)












