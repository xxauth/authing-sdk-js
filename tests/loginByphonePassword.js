const auth = require('../build/main/index');
var LocalStorage = require('node-localstorage').LocalStorage;
global.localStorage = new LocalStorage('./scratch');
// const authenticationClient = new auth.AuthenticationClient({
//     userPoolId: "7f74f487bc121542ad0c7e3d",
//     host: "https://core.xauth.lucfish.com"
// })

// authenticationClient.loginByPhonePassword('15975631947', '12').then((rsp) => {
//     console.log('rsp', rsp);
// })
const user = new auth.ManagementClient({
  userPoolId: '7f74f487bc121542ad0c7e3d',
//本地
  secret: 'cb6254521050caf857855214bc9dba98',
  host:'http://localhost:7001'

//线上
//   secret: 'lpRzBN37G6ANWnRAz02yexQGz05wkOrr',
//   host: 'https://console.xauth.lucfish.com'
}).users;
user.update('106394be-d1d1-4489-a02b-bb0bee2c1dcb', { password: '0909090' });
