// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiurl: "http://localhost:8000",
  //apiurl: 'https://arponline.herokuapp.com',

  firebase: {
    apiKey: "AIzaSyDjjOWJeh0kOlZ1_WVpNN-xVumfT3QPyVM",
    authDomain: "apr-online.firebaseapp.com",
    databaseURL: "https://apr-online.firebaseio.com",
    projectId: "apr-online",
    storageBucket: "apr-online.appspot.com",
    messagingSenderId: "962982148026",
    appId: "1:962982148026:web:58a1f0a908424cd4"
  }
};
