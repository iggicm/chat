// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pusher: {
    key: 'db07cb8dbf0131afd0f6',
    wsHost:'192.168.100.12',
    wsPort: 3030
  },
  oauth_client:{
    grant_type:'password',
    client_id:2,
    client_secret:'xLH3rvwjsP9SrvMqAhqKz1vgYWnQPdVIIXLDOPwj',
    token:''
  },
  debate_oauth_client:{
    grant_type:'password',
    client_id:2,
    client_secret:'COeH1hLHkTCf8TCTPbEVr1vbXtkiXHvlJ1SfnbY0',
    token:''
  },
  userdescriptor:null,
  userIsLogedIn:false,
  users:[]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
