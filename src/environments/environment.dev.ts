// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  test: false,
  dev: true,
  apiUrl: 'https://kutuphaneYonetimi-api.azurewebsites.net/api/v1/kutuphaneYonetimi/',
  socketUrl: 'https://kutuphaneYonetimi-api.azurewebsites.net/',
  uiUrl: 'https://kutuphaneYonetimi.azurewebsites.net/',
  recaptcha: {
    siteKey: '6Lfqg0ckAAAAAGie6mJw07UP5npA77TW9IsRdeLe',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
