<h1 align="center" >Angular Search Experience</h1>
<p align="center">
  This application is LIVE and available at this URL: <a href="https://angular-search-experience.firebaseapp.com">angular-search-experience.firebaseapp.com</a>
  <br/>
  <img align="center"  height="500" src="https://raw.githubusercontent.com/manekinekko/angular-search-experience/master/docs/screenshots/angular-search-experience.gif?token=ABnuHTtZsIzUFMSAiUKBwO7FEU507Qnqks5a3mQSwA%3D%3D"/>
</p>

# Setting up the project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0-rc.4.

## Cloning the source files

In order to download (clone) this project on your machine, you need to have `git` installed. Read more on [how to install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your machine.

Once installed, open up a terminal and clone this repository using the following command:

```
> git clone https://github.com/manekinekko/angular-search-experience.git
```

## Installing the dependencies

You will need `yarn` to install this project's dependencies. If you don't have `yarn` installed, here is [the official documentation](https://yarnpkg.com/lang/en/docs/install/#mac-stable). Next, Using your terminal, you will need to change directory to the folder where you previously cloned this project; by default (if you copied the commad line from above) this would be `angular-search-experience`:

```
> cd angular-search-experience
> yarn
```

## Developement server: the backend

The backed is relying on a Serverless architecture implemented Cloud Functions for Firebase. This project comes with `firebase-tools` as a local dependency. Please note that this dependency is usually installed globally.

To run (ie. emulate) the `search` Cloud Function locally, simply run `yarn start:backend`. This command will trigger two actions:

1.  change directory to the `functions` folder (at the root of the project). This folder contains all the backend code.
1.  Then it will serve the `search` Cloud Function locally on `http://localhost:5000/angular-search-experience/us-central1/search`

Please note that the `search` implements only the `POST` and `DELETE` HTTP methods, so you will need an HTTP client, such as `cURL` or `Postman`, to be able to request the Cloud Function.

## Development server: the front-end application

At the root of the project, run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/angular-search-experience/` directory. Use the `yarn build:prod` flag for a production build.
