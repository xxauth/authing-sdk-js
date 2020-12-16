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
var graphqlapi_1 = require("./../graphqlapi");
var GraphqlClient_1 = require("./../common/GraphqlClient");
var graphql_v2_1 = require("../../types/graphql.v2");
var utils_1 = require("../utils");
var QrCodeAuthenticationClient_1 = require("./QrCodeAuthenticationClient");
var graphqlapi_2 = require("../graphqlapi");
var HttpClient_1 = require("../common/HttpClient");
var DEFAULT_OPTIONS = {
    timeout: 10000,
    encrptionPublicKey: "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4xKeUgQ+Aoz7TLfAfs9+paePb\n5KIofVthEopwrXFkp8OCeocaTHt9ICjTT2QeJh6cZaDaArfZ873GPUn00eOIZ7Ae\n+TiA2BKHbCvloW3w5Lnqm70iSsUi5Fmu9/2+68GZRH9L7Mlh8cFksCicW2Y2W2uM\nGKl64GDcIq3au+aqJQIDAQAB\n-----END PUBLIC KEY-----",
    onError: function (_, message) {
        throw new Error(message);
    },
    enableAccessTokenCache: true,
    host: 'https://core.authing.cn',
    requestFrom: 'sdk'
};
var AuthenticationClient = /** @class */ (function () {
    function AuthenticationClient(options) {
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        var graphqlApiEndpointV2 = this.options.host + "/v2/graphql";
        // 子模块初始化顺序: GraphqlClient -> ManagementTokenProvider -> Others
        this.graphqlClientV2 = new GraphqlClient_1.GraphqlClient(graphqlApiEndpointV2, this.options);
        this.tokenProvider = new AuthenticationTokenProvider_1.AuthenticationTokenProvider(this.options);
        this.httpClient = new HttpClient_1.HttpClient(this.options, this.tokenProvider);
        this.wxqr = new QrCodeAuthenticationClient_1.QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'WXAPP_AUTH');
        this.qr = new QrCodeAuthenticationClient_1.QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'APP_AUTH');
    }
    AuthenticationClient.prototype.checkLoggedIn = function () {
        var user = this.tokenProvider.getUser();
        if (!user) {
            throw new Error('请先登录！');
        }
        return user;
    };
    /**
     * @description 通过邮箱注册
     *
     */
    AuthenticationClient.prototype.registerByEmail = function (email, password, profile, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, forceLogin, _b, generateToken, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = options || {};
                        profile = profile || {};
                        _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b;
                        password = utils_1.encrypt(password, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_1.registerByEmail(this.graphqlClientV2, this.tokenProvider, {
                                input: {
                                    email: email,
                                    password: password,
                                    profile: profile,
                                    forceLogin: forceLogin,
                                    generateToken: generateToken
                                }
                            })];
                    case 1:
                        user = (_c.sent()).registerByEmail;
                        this.tokenProvider.setUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @description 通过用户名密码注册
     *
     */
    AuthenticationClient.prototype.registerByUsername = function (username, password, profile, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, forceLogin, _b, generateToken, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = options || {};
                        profile = profile || {};
                        _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b;
                        password = utils_1.encrypt(password, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_1.registerByUsername(this.graphqlClientV2, this.tokenProvider, {
                                input: {
                                    username: username,
                                    password: password,
                                    profile: profile,
                                    forceLogin: forceLogin,
                                    generateToken: generateToken
                                }
                            })];
                    case 1:
                        user = (_c.sent()).registerByUsername;
                        this.tokenProvider.setUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @description 通过手机号注册
     *
     */
    AuthenticationClient.prototype.registerByPhoneCode = function (phone, code, password, profile, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, forceLogin, _b, generateToken, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = options || {};
                        profile = profile || {};
                        _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b;
                        password = utils_1.encrypt(password, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_1.registerByPhoneCode(this.graphqlClientV2, this.tokenProvider, {
                                input: {
                                    phone: phone,
                                    code: code,
                                    password: password,
                                    profile: profile,
                                    forceLogin: forceLogin,
                                    generateToken: generateToken
                                }
                            })];
                    case 1:
                        user = (_c.sent()).registerByPhoneCode;
                        this.tokenProvider.setUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @description 检查密码强度
     *
     */
    AuthenticationClient.prototype.checkPasswordStrength = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.checkPasswordStrength(this.graphqlClientV2, this.tokenProvider, { password: password })];
                    case 1:
                        result = (_a.sent()).checkPasswordStrength;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @description 发送短信验证码
     *
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
    AuthenticationClient.prototype.loginByEmail = function (email, password, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, autoRegister, captchaCode, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, captchaCode = options.captchaCode;
                        password = utils_1.encrypt(password, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_1.loginByEmail(this.graphqlClientV2, this.tokenProvider, {
                                input: { email: email, password: password, autoRegister: autoRegister, captchaCode: captchaCode }
                            })];
                    case 1:
                        user = (_b.sent()).loginByEmail;
                        this.tokenProvider.setUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthenticationClient.prototype.loginByUsername = function (username, password, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, autoRegister, captchaCode, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, captchaCode = options.captchaCode;
                        password = utils_1.encrypt(password, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_1.loginByUsername(this.graphqlClientV2, this.tokenProvider, {
                                input: { username: username, password: password, autoRegister: autoRegister, captchaCode: captchaCode }
                            })];
                    case 1:
                        user = (_b.sent()).loginByUsername;
                        this.tokenProvider.setUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthenticationClient.prototype.loginByPhoneCode = function (phone, code) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.loginByPhoneCode(this.graphqlClientV2, this.tokenProvider, {
                            input: { phone: phone, code: code }
                        })];
                    case 1:
                        user = (_a.sent()).loginByPhoneCode;
                        this.tokenProvider.setUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthenticationClient.prototype.loginByPhonePassword = function (phone, password, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, autoRegister, captchaCode, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, captchaCode = options.captchaCode;
                        password = utils_1.encrypt(password, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_1.loginByPhonePassword(this.graphqlClientV2, this.tokenProvider, {
                                input: { phone: phone, password: password, autoRegister: autoRegister, captchaCode: captchaCode }
                            })];
                    case 1:
                        user = (_b.sent()).loginByPhonePassword;
                        this.tokenProvider.setUser(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * 检测 AccessToken 所属用户的登录状态
     * @param token 用户 AccessToken
     */
    AuthenticationClient.prototype.checkLoginStatus = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.checkLoginStatus(this.graphqlClientV2, this.tokenProvider, {
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
     * @description 发送邮件
     * @param email: 邮件
     * @param scene: 发送场景
     *
     */
    AuthenticationClient.prototype.sendEmail = function (email, scene) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.sendEmail(this.graphqlClientV2, this.tokenProvider, { email: email, scene: scene })];
                    case 1:
                        data = (_a.sent()).sendEmail;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AuthenticationClient.prototype.resetPhonePassword = function (phone, code, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword = utils_1.encrypt(newPassword, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_2.resetPassword(this.graphqlClientV2, this.tokenProvider, {
                                phone: phone,
                                code: code,
                                newPassword: newPassword
                            })];
                    case 1:
                        data = (_a.sent()).resetPassword;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AuthenticationClient.prototype.resetEmailPassword = function (email, code, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword = utils_1.encrypt(newPassword, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_2.resetPassword(this.graphqlClientV2, this.tokenProvider, {
                                email: email,
                                code: code,
                                newPassword: newPassword
                            })];
                    case 1:
                        data = (_a.sent()).resetPassword;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AuthenticationClient.prototype.updateProfile = function (updates) {
        return __awaiter(this, void 0, void 0, function () {
            var user, updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.checkLoggedIn();
                        if (updates && updates.password) {
                            delete updates.password;
                        }
                        return [4 /*yield*/, graphqlapi_2.updateUser(this.graphqlClientV2, this.tokenProvider, {
                                id: user.id,
                                input: updates
                            })];
                    case 1:
                        updated = (_a.sent()).updateUser;
                        this.tokenProvider.setUser(updated);
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    /**
     * 更新用户密码
     * @param newPassword 新密码
     * @param oldPassword 旧密码
     */
    AuthenticationClient.prototype.updatePassword = function (newPassword, oldPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword =
                            newPassword && utils_1.encrypt(newPassword, this.options.encrptionPublicKey);
                        oldPassword =
                            oldPassword && utils_1.encrypt(oldPassword, this.options.encrptionPublicKey);
                        return [4 /*yield*/, graphqlapi_1.updatePassword(this.graphqlClientV2, this.tokenProvider, {
                                newPassword: newPassword,
                                oldPassword: oldPassword
                            })];
                    case 1:
                        user = (_a.sent()).updatePassword;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * 更新用户手机号
     * @param phone 新手机号
     * @param phoneCode 新手机号的验证码
     * @param oldPhone 旧手机号
     * @param oldPhoneCode 旧手机号的验证码
     */
    AuthenticationClient.prototype.updatePhone = function (phone, phoneCode, oldPhone, oldPhoneCode) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.updatePhone(this.graphqlClientV2, this.tokenProvider, {
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
     * 更新用户邮箱
     * @param email 新邮箱
     * @param emailCode 新邮箱的验证码
     * @param oldEmail 旧邮箱
     * @param oldEmailCode 旧邮箱的验证码
     */
    AuthenticationClient.prototype.updateEmail = function (email, emailCode, oldEmail, oldEmailCode) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.updateEmail(this.graphqlClientV2, this.tokenProvider, {
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
    AuthenticationClient.prototype.refreshToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkLoggedIn();
                        return [4 /*yield*/, graphqlapi_1.refreshToken(this.graphqlClientV2, this.tokenProvider, {})];
                    case 1:
                        data = (_a.sent()).refreshToken;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AuthenticationClient.prototype.bindPhone = function (phone, phoneCode) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.bindPhone(this.graphqlClientV2, this.tokenProvider, {
                            phone: phone,
                            phoneCode: phoneCode
                        })];
                    case 1:
                        user = (_a.sent()).bindPhone;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthenticationClient.prototype.unbindPhone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.unbindPhone(this.graphqlClientV2, this.tokenProvider, {})];
                    case 1:
                        user = (_a.sent()).unbindPhone;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @description 获取当前登录的用户信息
     *
     */
    AuthenticationClient.prototype.currentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, graphqlapi_1.user(this.graphqlClientV2, this.tokenProvider, {})];
                    case 1:
                        data = (_b.sent()).user;
                        this.tokenProvider.setUser(data);
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
     * @description 设置当前用户，适合社会化登录手动 set 的接口
     *
     */
    AuthenticationClient.prototype.setCurrentUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.tokenProvider.setUser(user);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @description 退出登录，清空 localStorage 里的 user 和 token
     *
     */
    AuthenticationClient.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.checkLoggedIn();
                        return [4 /*yield*/, graphqlapi_2.updateUser(this.graphqlClientV2, this.tokenProvider, {
                                id: user.id,
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
    AuthenticationClient.prototype.udv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.checkLoggedIn();
                        return [4 /*yield*/, graphqlapi_1.udv(this.graphqlClientV2, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
                                targetId: user.id
                            })];
                    case 1:
                        list = (_a.sent()).udv;
                        return [2 /*return*/, list];
                }
            });
        });
    };
    AuthenticationClient.prototype.setUdv = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var user, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.checkLoggedIn();
                        value = JSON.stringify(value);
                        return [4 /*yield*/, graphqlapi_1.setUdv(this.graphqlClientV2, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
                                targetId: user.id,
                                key: key,
                                value: value
                            })];
                    case 1:
                        list = (_a.sent()).setUdv;
                        return [2 /*return*/, list];
                }
            });
        });
    };
    AuthenticationClient.prototype.removeUdv = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var user, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.checkLoggedIn();
                        return [4 /*yield*/, graphqlapi_1.removeUdv(this.graphqlClientV2, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
                                targetId: user.id,
                                key: key
                            })];
                    case 1:
                        list = (_a.sent()).removeUdv;
                        return [2 /*return*/, list];
                }
            });
        });
    };
    return AuthenticationClient;
}());
exports.AuthenticationClient = AuthenticationClient;
