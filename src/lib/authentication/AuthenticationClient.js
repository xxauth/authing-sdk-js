"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthenticationClient = void 0;
var AuthenticationTokenProvider_1 = require("./AuthenticationTokenProvider");
var graphqlapi_1 = require("../graphqlapi");
var GraphqlClient_1 = require("../common/GraphqlClient");
var graphql_v2_1 = require("../../types/graphql.v2");
var QrCodeAuthenticationClient_1 = require("./QrCodeAuthenticationClient");
var MfaAuthenticationClient_1 = require("./MfaAuthenticationClient");
var graphqlapi_2 = require("../graphqlapi");
var HttpClient_1 = require("../common/HttpClient");
var utils_1 = require("../utils");
var jwt_decode_1 = require("jwt-decode");
var SocialAuthenticationClient_1 = require("./SocialAuthenticationClient");
var DEFAULT_OPTIONS = {
    timeout: 10000,
    encrptionPublicKey: "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4xKeUgQ+Aoz7TLfAfs9+paePb\n5KIofVthEopwrXFkp8OCeocaTHt9ICjTT2QeJh6cZaDaArfZ873GPUn00eOIZ7Ae\n+TiA2BKHbCvloW3w5Lnqm70iSsUi5Fmu9/2+68GZRH9L7Mlh8cFksCicW2Y2W2uM\nGKl64GDcIq3au+aqJQIDAQAB\n-----END PUBLIC KEY-----",
    onError: function (code, message, data) {
        throw { code: code, message: message, data: data };
    },
    host: 'https://core.authing.cn',
    requestFrom: 'sdk',
    encryptFunction: utils_1.encrypt
};
/**
 * @class AuthenticationClient 认证核心模块
 * @description 此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。
 *
 * @example
 *
 * 使用方法：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * authenticationClient.registerByEmail // 使用邮箱注册
 * authenticationClient.loginByEmail // 使用邮箱登录
 * \`\`\`
 *
 *
 * @name AuthenticationClient
 */
var AuthenticationClient = /** @class */ (function () {
    function AuthenticationClient(options) {
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        var graphqlApiEndpointV2 = this.options.host + "/v2/graphql";
        // 子模块初始化顺序: GraphqlClient -> ManagementTokenProvider -> Others
        this.graphqlClient = new (this.options.graphqlClient || GraphqlClient_1.GraphqlClient)(graphqlApiEndpointV2, this.options);
        this.tokenProvider = new (this.options.tokenProvider ||
            AuthenticationTokenProvider_1.AuthenticationTokenProvider)(this.options);
        this.httpClient = new (this.options.httpClient || HttpClient_1.HttpClient)(this.options, this.tokenProvider);
        this.wxqrcode = new QrCodeAuthenticationClient_1.QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'WXAPP_AUTH');
        this.qrcode = new QrCodeAuthenticationClient_1.QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'APP_AUTH');
        this.mfa = new MfaAuthenticationClient_1.MfaAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
        this.social = new SocialAuthenticationClient_1.SocialAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
        if (this.options.accessToken) {
            this.setToken(this.options.accessToken);
        }
    }
    AuthenticationClient.prototype.checkLoggedIn = function () {
        var user = this.tokenProvider.getUser();
        if (user) {
            return user.id;
        }
        var token = this.tokenProvider.getToken();
        if (!token) {
            throw new Error('请先登录！');
        }
        var decoded = jwt_decode_1["default"](token);
        var userId = decoded.data.id;
        if (!userId) {
            throw new Error('不合法的 accessToken');
        }
        return userId;
    };
    AuthenticationClient.prototype.setCurrentUser = function (user) {
        this.tokenProvider.setUser(user);
    };
    AuthenticationClient.prototype.setToken = function (token) {
        this.tokenProvider.setToken(token);
    };
    /**
     * @name registerByEmail
     * @name_zh 使用邮箱注册
     * @description 使用邮箱注册，此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以使用 pipeline 对此类请求进行拦截。
     *
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @param {RegisterProfile} [profile] 用户资料
     * @param {Object} [options]
     * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
     * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.registerByEmail(
     *  'test@example.com',
     *  'passw0rd',
     *  {
     *    nickname: 'Nick'
     *  },
     *  {
     *    generateToken: true
     *  }
     * )
     *
     * @example
     * authenticationClient.registerByEmail('test@example.com', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.registerByEmail = function (email, password, profile, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, forceLogin, _b, generateToken, clientIp, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = options || {};
                        profile = profile || {};
                        _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b, clientIp = options.clientIp;
                        return [4 /*yield*/, this.options.encryptFunction(password, this.options.encrptionPublicKey)];
                    case 1:
                        password = _c.sent();
                        return [4 /*yield*/, graphqlapi_1.registerByEmail(this.graphqlClient, this.tokenProvider, {
                                input: {
                                    email: email,
                                    password: password,
                                    profile: profile,
                                    forceLogin: forceLogin,
                                    generateToken: generateToken,
                                    clientIp: clientIp
                                }
                            })];
                    case 2:
                        user = (_c.sent()).registerByEmail;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name registerByUsername
     * @name_zh 使用用户名注册
     * @description 使用用户名注册
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     * @param {RegisterProfile} [profile] 用户资料
     * @param {Object} [options]
     * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
     * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     *
     * @example
     *
     * authenticationClient.registerByUsername(
     *  'bob',
     *  'passw0rd',
     *  {
     *    nickname: 'Nick'
     *  },
     *  {
     *    generateToken: true
     *  }
     * )
     *
     * @example
     * authenticationClient.registerByUsername('bob', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.registerByUsername = function (username, password, profile, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, forceLogin, _b, generateToken, clientIp, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = options || {};
                        profile = profile || {};
                        _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b, clientIp = options.clientIp;
                        return [4 /*yield*/, this.options.encryptFunction(password, this.options.encrptionPublicKey)];
                    case 1:
                        password = _c.sent();
                        return [4 /*yield*/, graphqlapi_1.registerByUsername(this.graphqlClient, this.tokenProvider, {
                                input: {
                                    username: username,
                                    password: password,
                                    profile: profile,
                                    forceLogin: forceLogin,
                                    generateToken: generateToken,
                                    clientIp: clientIp
                                }
                            })];
                    case 2:
                        user = (_c.sent()).registerByUsername;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name registerByPhoneCode
     * @name_zh 使用手机号注册
     * @description 使用手机号注册，你可以同时设置该账号的初始密码。发送短信的接口请见 sendSmsCode
     *
     * @param {string} phone 手机号
     * @param {string} code 短信验证码
     * @param {string} password 初始密码
     * @param {RegisterProfile} [profile] 用户资料
     * @param {Object} [options]
     * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
     * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.registerByPhoneCode(
     *  '176xxxx7041',
     *  '1234',
     *  'passw0rd',
     *  {
     *    nickname: 'Nick'
     *  },
     *  {
     *    generateToken: true
     *  }
     * )
     *
     * @example
     * authenticationClient.registerByPhoneCode('176xxxx7041', '1234')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.registerByPhoneCode = function (phone, code, password, profile, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, forceLogin, _b, generateToken, clientIp, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = options || {};
                        profile = profile || {};
                        _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b, clientIp = options.clientIp;
                        if (!password) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.options.encryptFunction(password, this.options.encrptionPublicKey)];
                    case 1:
                        password = _c.sent();
                        _c.label = 2;
                    case 2: return [4 /*yield*/, graphqlapi_1.registerByPhoneCode(this.graphqlClient, this.tokenProvider, {
                            input: {
                                phone: phone,
                                code: code,
                                password: password,
                                profile: profile,
                                forceLogin: forceLogin,
                                generateToken: generateToken,
                                clientIp: clientIp
                            }
                        })];
                    case 3:
                        user = (_c.sent()).registerByPhoneCode;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name checkPasswordStrength
     * @name_zh 检查密码强度
     * @description 检查密码强度，详情请见: https://docs.authing.co/security/config-user-pool-password-level.html
     *
     * @param {string} password
     * @example
     * authenticationClient.checkPasswordStrength('weak')
     *
     * @example
     * authenticationClient.checkPasswordStrength('strongPassw0rd!')
     *
     * @returns {Promise<CheckPasswordStrengthResult>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.checkPasswordStrength = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.checkPasswordStrength(this.graphqlClient, this.tokenProvider, { password: password })];
                    case 1:
                        result = (_a.sent()).checkPasswordStrength;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @name sendSmsCode
     * @name_zh 发送短信验证码
     * @description 发送短信验证码, 短信验证码的有效时间为 60 s。
     *
     * @param {string} phone
     * @example
     * authenticationClient.sendSmsCode('176xxxx6754')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.sendSmsCode = function (phone) {
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/sms/send";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: { phone: phone }
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name loginByEmail
     * @name_zh 使用邮箱登录
     * @description 使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，可以使用 pipeline 对此类请求进行拦截。
     *
     * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
     *
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @param {Object} [options]
     * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
     * @param {string} [options.captchaCode] 图形验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.loginByEmail(
     *  'test@example.com',
     *  'passw0rd',
     *  {
     *    autoRegister: true，
     *    captchaCode: 'xj72'
     *  }
     * )
     *
     * @example
     * authenticationClient.loginByEmail('test@example.com', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.loginByEmail = function (email, password, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, autoRegister, captchaCode, clientIp, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, captchaCode = options.captchaCode, clientIp = options.clientIp;
                        return [4 /*yield*/, this.options.encryptFunction(password, this.options.encrptionPublicKey)];
                    case 1:
                        password = _b.sent();
                        return [4 /*yield*/, graphqlapi_1.loginByEmail(this.graphqlClient, this.tokenProvider, {
                                input: { email: email, password: password, autoRegister: autoRegister, captchaCode: captchaCode, clientIp: clientIp }
                            })];
                    case 2:
                        user = (_b.sent()).loginByEmail;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name loginByUsername
     * @name_zh 使用用户名登录
     * @description 使用用户名登录。
     *
     * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     * @param {Object} [options]
     * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
     * @param {string} [options.captchaCode] 图形验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     *
     * @example
     *
     * authenticationClient.loginByEmail(
     *  'test@example.com',
     *  'passw0rd',
     *  {
     *    autoRegister: true，
     *    captchaCode: 'xj72'
     *  }
     * )
     *
     * @example
     * authenticationClient.loginByEmail('test@example.com', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.loginByUsername = function (username, password, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, autoRegister, captchaCode, clientIp, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, captchaCode = options.captchaCode, clientIp = options.clientIp;
                        return [4 /*yield*/, this.options.encryptFunction(password, this.options.encrptionPublicKey)];
                    case 1:
                        password = _b.sent();
                        return [4 /*yield*/, graphqlapi_1.loginByUsername(this.graphqlClient, this.tokenProvider, {
                                input: { username: username, password: password, autoRegister: autoRegister, captchaCode: captchaCode, clientIp: clientIp }
                            })];
                    case 2:
                        user = (_b.sent()).loginByUsername;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name loginByPhoneCode
     * @name_zh 使用手机号验证码登录
     * @description 使用手机号验证码登录。
     *
     *
     * @param {string} phone 手机号
     * @param {string} code 短信验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.loginByPhoneCode(
     *  '176xxxx7041',
     *  '1234',
     * )
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.loginByPhoneCode = function (phone, code, options) {
        return __awaiter(this, void 0, void 0, function () {
            var clientIp, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options || {};
                        clientIp = options.clientIp;
                        return [4 /*yield*/, graphqlapi_1.loginByPhoneCode(this.graphqlClient, this.tokenProvider, {
                                input: { phone: phone, code: code, clientIp: clientIp }
                            })];
                    case 1:
                        user = (_a.sent()).loginByPhoneCode;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name loginByPhonePassword
     * @name_zh 使用手机号密码登录
     * @description 使用手机号密码登录。
     *
     *
     * @param {string} phone 手机号
     * @param {string} password 密码
     * @param {Object} [options]
     * @param {string} [options.captchaCode] 图形验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.loginByPhonePassword(
     *  '176xxxx7041',
     *  'passw0rd',
     *  {
     *    captchaCode: 'xj72'
     *  }
     * )
     *
     * @example
     * authenticationClient.loginByPhonePassword('176xxxx7041', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.loginByPhonePassword = function (phone, password, options) {
        return __awaiter(this, void 0, void 0, function () {
            var captchaCode, _a, autoRegister, clientIp, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        captchaCode = options.captchaCode, _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, clientIp = options.clientIp;
                        return [4 /*yield*/, this.options.encryptFunction(password, this.options.encrptionPublicKey)];
                    case 1:
                        password = _b.sent();
                        return [4 /*yield*/, graphqlapi_1.loginByPhonePassword(this.graphqlClient, this.tokenProvider, {
                                input: { phone: phone, password: password, captchaCode: captchaCode, autoRegister: autoRegister, clientIp: clientIp }
                            })];
                    case 2:
                        user = (_b.sent()).loginByPhonePassword;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name checkLoginStatus
     * @name_zh 检测 Token 登录状态
     * @description 检测 Token 登录状态
     *
     * @param {string} token 用户的登录凭证 token
     *
     * @example
     *
     * authenticationClient.checkLoginStatus('TOKEN')
     *
     * @returns {Promise<JwtTokenStatus>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.checkLoginStatus = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.checkLoginStatus(this.graphqlClient, this.tokenProvider, {
                            token: token
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.checkLoginStatus];
                }
            });
        });
    };
    /**
     * @name sendEmail
     * @name_zh 发送邮件
     * @description 发送邮件
     *
     * @param {string} email 邮箱
     * @param {EmailScene} scene 发送场景，可选值为 RESET_PASSWORD（发送重置密码邮件，邮件中包含验证码）、VerifyEmail（发送验证邮箱的邮件）、ChangeEmail（发送修改邮箱邮件，邮件中包含验证码）
     *
     * @example
     *
     * import { EmailScene } from "authing-js-sdk"
     * authenticationClient.sendEmail('test@example.com', EmailScene.RESET_PASSWORD)
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.sendEmail = function (email, scene) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.sendEmail(this.graphqlClient, this.tokenProvider, { email: email, scene: scene })];
                    case 1:
                        data = (_a.sent()).sendEmail;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name resetPasswordByPhoneCode
     * @name_zh 通过短信验证码重置密码
     * @description 通过短信验证码重置密码，你需要先调用 sendSmsCode 接口发送重置密码邮件。
     *
     * @param {string} phone 手机号
     * @param {string} code 验证码
     * @param {string} newPassword 新的密码
     *
     * @example
     *
     * authenticationClient.resetPasswordByPhoneCode('176xxxx7041', '1234', 'passw0rd')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.resetPasswordByPhoneCode = function (phone, code, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.options.encryptFunction(newPassword, this.options.encrptionPublicKey)];
                    case 1:
                        newPassword = _a.sent();
                        return [4 /*yield*/, graphqlapi_2.resetPassword(this.graphqlClient, this.tokenProvider, {
                                phone: phone,
                                code: code,
                                newPassword: newPassword
                            })];
                    case 2:
                        data = (_a.sent()).resetPassword;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name resetPasswordByEmailCode
     * @name_zh 通过邮件验证码重置密码
     * @description 通过邮件验证码重置密码，你需要先调用 sendEmail 接口发送重置密码邮件。
     *
     * @param {string} phone 手机号
     * @param {string} code 验证码
     * @param {string} newPassword 新的密码
     *
     * @example
     *
     * authenticationClient.resetPasswordByEmailCode('test@example.com', '1234', 'passw0rd')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.resetPasswordByEmailCode = function (email, code, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.options.encryptFunction(newPassword, this.options.encrptionPublicKey)];
                    case 1:
                        newPassword = _a.sent();
                        return [4 /*yield*/, graphqlapi_2.resetPassword(this.graphqlClient, this.tokenProvider, {
                                email: email,
                                code: code,
                                newPassword: newPassword
                            })];
                    case 2:
                        data = (_a.sent()).resetPassword;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name updateProfile
     * @name_zh 修改用户资料
     * @description 修改用户资料，此接口不能用于修改手机号、邮箱、密码，如果需要请调用 updatePhone、updateEmail、updatePassword 接口。
     *
     * @param {UpdateUserInput} updates 修改的用户资料
     * @param {string} updates.username 用户名
     * @param {string} updates.nickname 昵称
     * @param {string} updates.photo 头像
     * @param {string} updates.company 公司
     * @param {string} updates.browser 浏览器
     * @param {string} updates.device 设备
     * @param {string} updates.lastIP 最近登录的 IP
     * @param {string} updates.name Name
     * @param {string} updates.givenName Given Name
     * @param {string} updates.familyName Family Name
     * @param {string} updates.middleName Middle Name
     * @param {string} updates.profile Profile Url
     * @param {string} updates.preferredUsername Preferred Name
     * @param {string} updates.website 个人网站
     * @param {string} updates.gender 性别, F 表示男性、W 表示女性、未知表示 U
     * @param {string} updates.birthdate 生日
     * @param {string} updates.zoneinfo 时区
     * @param {string} updates.locale 语言
     * @param {string} updates.address 地址
     * @param {string} updates.streetAddress 街道地址
     * @param {string} updates.locality
     * @param {string} updates.region 地域
     * @param {string} updates.postalCode 邮编
     * @param {string} updates.city 城市
     * @param {string} updates.province 省份
     * @param {string} updates.country 国家
     *
     * @example
     *
     * authenticationClient.updateProfile({
     *  nickname: "Nick",
     *  lastIp: "111.111.111.111"
     * })
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.updateProfile = function (updates) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.checkLoggedIn();
                        if (updates && updates.password) {
                            delete updates.password;
                        }
                        return [4 /*yield*/, graphqlapi_2.updateUser(this.graphqlClient, this.tokenProvider, {
                                id: userId,
                                input: updates
                            })];
                    case 1:
                        updated = (_a.sent()).updateUser;
                        this.setCurrentUser(updated);
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    /**
     * @name updatePassword
     * @name_zh 更新用户密码
     * @description 更新用户密码
     *
     * @param {string} newPassword 新密码
     * @param {string} [oldPassword] 旧密码，如果用户没有设置密码，可以不填。
     *
     * @example
     *
     * authenticationClient.updatePassword('passw0rd') // 由手机号、社会化登录等其他方式注册的，首次没有设置密码，oldPassword 留空。
     *
     * @example
     *
     * authenticationClient.updatePassword('passw0rd', 'oldPassw0rd') // 用户之前设置了密码
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.updatePassword = function (newPassword, oldPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = newPassword;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.options.encryptFunction(newPassword, this.options.encrptionPublicKey)];
                    case 1:
                        _a = (_c.sent());
                        _c.label = 2;
                    case 2:
                        newPassword = _a;
                        _b = oldPassword;
                        if (!_b) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.options.encryptFunction(oldPassword, this.options.encrptionPublicKey)];
                    case 3:
                        _b = (_c.sent());
                        _c.label = 4;
                    case 4:
                        oldPassword = _b;
                        return [4 /*yield*/, graphqlapi_1.updatePassword(this.graphqlClient, this.tokenProvider, {
                                newPassword: newPassword,
                                oldPassword: oldPassword
                            })];
                    case 5:
                        user = (_c.sent()).updatePassword;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name updatePhone
     * @name_zh 更新用户手机号
     * @description 更新用户手机号。和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）。
     * 也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号。
     * 开发者也可以选择不开启 “验证原有手机号“ ，可以在 Authing 控制台 的 设置目录下的安全信息模块进行关闭。
     * 用户首次绑定手机号请使用 bindPhone 接口。
     *
     * @param {string} phone 新手机号
     * @param {string} phoneCode 新手机号的验证码
     * @param {string} [oldPhone] 旧手机号
     * @param {string} [oldPhoneCode] 旧手机号的验证码
     *
     * @example
     *
     * authenticationClient.updatePhone('176xxxx7041', '1234') // 关闭了“验证原有手机号“选项
     *
     * @example
     *
     * authenticationClient.updatePhone('176xxxx7041', '1234', '156xxxx9876', '1234') // 开启了“验证原有手机号“选项
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.updatePhone = function (phone, phoneCode, oldPhone, oldPhoneCode) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.updatePhone(this.graphqlClient, this.tokenProvider, {
                            phone: phone,
                            phoneCode: phoneCode,
                            oldPhone: oldPhone,
                            oldPhoneCode: oldPhoneCode
                        })];
                    case 1:
                        user = (_a.sent()).updatePhone;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name updateEmail
     * @name_zh 更新用户邮箱
     * @description 如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱。
     * 开发者也可以选择不开启 “验证原有邮箱“ ，可以在 Authing 控制台 的 设置目录下的安全信息模块进行关闭。
     * 用户首次绑定手机号请使用 bindEmail 接口。
     *
     * @param {string} email 新邮箱
     * @param {string} emailCode 新邮箱的验证码
     * @param {string} [oldEmail] 旧邮箱
     * @param {string} [oldEmailCode] 旧邮箱的验证码
     *
     * @example
     *
     * authenticationClient.updateEmail('test@example.com', '1234') // 关闭了“验证原有邮箱“选项
     *
     * @example
     *
     * authenticationClient.updateEmail('test@example.com', '1234', 'test2@example.com', '1234') // 开启了“验证原有邮箱“选项
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.updateEmail = function (email, emailCode, oldEmail, oldEmailCode) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.updateEmail(this.graphqlClient, this.tokenProvider, {
                            email: email,
                            emailCode: emailCode,
                            oldEmail: oldEmail,
                            oldEmailCode: oldEmailCode
                        })];
                    case 1:
                        user = (_a.sent()).updateEmail;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name refreshToken
     * @name_zh 刷新当前用户的 token
     * @description 刷新当前用户的 token，调用此接口要求先登录。
     *
     * @example
     *
     * authenticationClient.updateEmail()
     *
     * @returns {Promise<RefreshToken>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.refreshToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.refreshToken(this.graphqlClient, this.tokenProvider, {})];
                    case 1:
                        data = (_a.sent()).refreshToken;
                        this.setToken(data.token);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name bindPhone
     * @name_zh 绑定手机号
     * @description 用户初次绑定手机号，如果需要修改手机号请使用 updatePhone 接口。
     *
     * @param {string} phone
     * @param {string} phoneCode
     *
     * @example
     *
     * authenticationClient.bindPhone('176xxxx7041', '1234')
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.bindPhone = function (phone, phoneCode) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.bindPhone(this.graphqlClient, this.tokenProvider, {
                            phone: phone,
                            phoneCode: phoneCode
                        })];
                    case 1:
                        user = (_a.sent()).bindPhone;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name unbindPhone
     * @name_zh 解绑手机号
     * @description 用户解绑手机号
     *
     * @example
     *
     * authenticationClient.unbindPhone()
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.unbindPhone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.unbindPhone(this.graphqlClient, this.tokenProvider, {})];
                    case 1:
                        user = (_a.sent()).unbindPhone;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name unbindPhone
     * @name_zh 解绑手机号
     * @description 用户解绑手机号
     *
     * @example
     *
     * authenticationClient.unbindPhone()
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.unbindEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.unbindEmail(this.graphqlClient, this.tokenProvider, {})];
                    case 1:
                        user = (_a.sent()).unbindEmail;
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name getCurrentUser
     * @name_zh 获取当前登录的用户信息
     * @description 获取当前登录的用户信息
     *
     * @example
     *
     * authenticationClient.getCurrentUser()
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.getCurrentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, graphqlapi_1.user(this.graphqlClient, this.tokenProvider, {})];
                    case 1:
                        data = (_b.sent()).user;
                        this.setCurrentUser(data);
                        return [2 /*return*/, data];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @name logout
     * @name_zh 退出登录
     * @description 退出登录，清空 localStorage 里的 user 和 token
     *
     * @example
     *
     * authenticationClient.logout()
     *
     * @returns {null}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.checkLoggedIn();
                        return [4 /*yield*/, graphqlapi_2.updateUser(this.graphqlClient, this.tokenProvider, {
                                id: userId,
                                input: {
                                    tokenExpiredAt: '0'
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.tokenProvider.clearUser();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationClient.prototype.convertUdv = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var dataType = item.dataType, value = item.value;
            if (dataType === graphql_v2_1.UdfDataType.Number) {
                item.value = JSON.parse(value);
            }
            else if (dataType === graphql_v2_1.UdfDataType.Boolean) {
                item.value = JSON.parse(value);
            }
            else if (dataType === graphql_v2_1.UdfDataType.Datetime) {
                item.value = new Date(parseInt(value));
            }
            else if (dataType === graphql_v2_1.UdfDataType.Object) {
                item.value = JSON.parse(value);
            }
        }
        return data;
    };
    /**
     * @name listUdv
     * @name_zh 获取当前用户的自定义数据列表
     * @description 获取当前用户的自定义数据列表
     *
     * @example
     *
     * authenticationClient.listUdv()
     *
     * @returns {Promise<Array<UserDefinedData>>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.listUdv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.checkLoggedIn();
                        return [4 /*yield*/, graphqlapi_1.udv(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
                                targetId: userId
                            })];
                    case 1:
                        list = (_a.sent()).udv;
                        return [2 /*return*/, this.convertUdv(list)];
                }
            });
        });
    };
    /**
     * @name setUdv
     * @name_zh 添加自定义数据
     * @description 添加自定义数据
     *
     * @param {string} key 自定义字段的 key
     * @param {any} value 自定义数据的值，值的类型必须要和用户池定义的自定义字段类型一致。
     *
     * @example
     *
     * authenticationClient.setUdv('school', '清华大学') // 要求用户必须定义了 school 这个字段。
     *
     * @returns {Promise<Array<UserDefinedData>>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.setUdv = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.checkLoggedIn();
                        value = JSON.stringify(value);
                        return [4 /*yield*/, graphqlapi_1.setUdv(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
                                targetId: userId,
                                key: key,
                                value: value
                            })];
                    case 1:
                        list = (_a.sent()).setUdv;
                        return [2 /*return*/, this.convertUdv(list)];
                }
            });
        });
    };
    /**
     * @name removeUdv
     * @name_zh 删除自定义数据
     * @description 删除自定义数据
     *
     * @param key 自定义字段的 key
     *
     * @example
     *
     * authenticationClient.removeUdv('school')
     *
     *
     * @returns {Promise<Array<UserDefinedData>>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.removeUdv = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this.checkLoggedIn();
                        return [4 /*yield*/, graphqlapi_1.removeUdv(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
                                targetId: userId,
                                key: key
                            })];
                    case 1:
                        list = (_a.sent()).removeUdv;
                        return [2 /*return*/, this.convertUdv(list)];
                }
            });
        });
    };
    /**
     * @name listOrg
     * @name_zh 获取用户所在组织机构
     * @description 获取用户所在的组织机构立碑，以及他所属的节点在此组织机构内的完整路径。
     *
     * @example
     *
     * const data = await authenticationClient.listOrgs();
     *
     * @returns {Promise<UserOrgList>}
     *
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.listOrgs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.options.host + "/api/v2/users/me/orgs"
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @name loginByLdap
     * @name_zh 使用 LDAP 用户名登录
     * @description 使用 LDAP 用户名登录。
     *
     * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     * @param {Object} [options]
     * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
     * @param {string} [options.captchaCode] 图形验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *   userPoolId: '你的用户池 ID',
     *   appId: '应用 ID'
     * })
     *
     * authenticationClient.loginByLdap(
     *  'admin',
     *  'admin',
     * )
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.loginByLdap = function (username, password, options) {
        return __awaiter(this, void 0, void 0, function () {
            var api, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = options || {};
                        api = this.options.host + "/api/v2/ldap/verify-user";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: {
                                    username: username,
                                    password: password
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @name loginByAd
     * @name_zh 使用 AD 用户名登录
     * @description 使用 AD 用户名登录。
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     *
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *   userPoolId: '你的用户池 ID',
     *   appId: '应用 ID'
     * })
     *
     * authenticationClient.loginByAd(
     *  'admin',
     *  'admin',
     * )
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    AuthenticationClient.prototype.loginByAd = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var firstLevelDomain, api, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstLevelDomain = new URL(this.options.host).hostname
                            .split('.')
                            .slice(1)
                            .join('.');
                        api = "https://ws." + firstLevelDomain + "/api/v2/ad/verify-user";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: {
                                    username: username,
                                    password: password
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        this.setCurrentUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return AuthenticationClient;
}());
exports.AuthenticationClient = AuthenticationClient;
