const auth = require('../build/main/index');
var LocalStorage = require('node-localstorage').LocalStorage;
global.localStorage = new LocalStorage('./scratch');
const authenticationClient = new auth.AuthenticationClient({
    userPoolId: "7f74f487bc121542ad0c7e3d",
    host: "https://core.xauth.lucfish.com"
})


authenticationClient.loginByPhonePassword('15975631947', '12').then((rsp) => {
    console.log('rsp', rsp);
})

