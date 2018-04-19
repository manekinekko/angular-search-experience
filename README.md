<h1 align="center" >Angular Search Experience</h1>
<p align="center">
  This application is LIVE and available at this URL: <a href="https://angular-search-experience.firebaseapp.com">angular-search-experience.firebaseapp.com</a>
  <br/>
  <img align="center"  height="500" src="https://raw.githubusercontent.com/manekinekko/angular-search-experience/master/docs/screenshots/angular-search-experience.gif?token=ABnuHTtZsIzUFMSAiUKBwO7FEU507Qnqks5a3mQSwA%3D%3D"/>
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
 
The backed is relying on a Serverless architecture implemented Cloud Functions for Firebase. This project comes with `firebase-tools` as a local dependency. Please note that this dependency is usually installed globally.

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


We've decided to secure the Cloud Function (this is a good practice). So, in order to request the local `search` Cloud Function, you'll have to append an `Authorization` header to your requests. Here is the required header `Authorization: SearchToken this-is-a-fake-token`. 

Here is an curl command:

```
> curl -H "Authorization: SearchToken this-is-a-fake-token" -H "Content-Type: application/json" -X POST -d '{}' https://us-central1-angular-search-experience.cloudfunctions.net/search/api/1/apps

{"createdAt":"2018-04-19T13:17:10.343Z","taskID":29343382,"objectID":"10788302"}
```

> NOTE: we don't validate the `application` object on purpose.

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

The production app is available on: https://angular-search-experience.firebaseapp.com

The production backend (cloud function) is available on: https://us-central1-angular-search-experience.cloudfunctions.net/search


# Implemented features

## Bakend

