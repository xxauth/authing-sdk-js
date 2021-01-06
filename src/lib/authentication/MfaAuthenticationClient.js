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
exports.MfaAuthenticationClient = void 0;
/**
 * @class MfaAuthenticationClient 多因素认证模块
 * @description 此模块用于进行绑定 MFA 认证器、解绑 MFA 认证器、用户二次认证。
 *
 * 请求绑定 MFA 认证器：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.mfa.assosicateMfaAuthenticator({authenticatorType: 'totp'})
 * \`\`\`
 *
 * 验证 MFA 二次口令：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.mfa.verifyTotpMfa({totp: '112233', mfaToken: 'xxx'})
 * \`\`\`
 *
 * @name MfaAuthenticationClient
 */
var MfaAuthenticationClient = /** @class */ (function () {
    function MfaAuthenticationClient(options, tokenProvider, httpClient) {
        this.options = options;
        this.tokenProvider = tokenProvider;
        this.httpClient = httpClient;
    }
    /**
     * @name getMfaAuthenticators
     * @name_zh 获取 MFA 认证器
     * @description 获取 MFA 认证器
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.getMfaAuthenticators({ type: 'totp' })
     *
     * @returns {Promise<IMfaAuthenticators>}
     * @memberof MfaAuthenticationClient
     */
    MfaAuthenticationClient.prototype.getMfaAuthenticators = function (options) {
        if (options === void 0) { options = { type: 'totp' }; }
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/mfa/authenticator";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: api,
                                params: {
                                    type: options.type
                                }
                            })];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name assosicateMfaAuthenticator
     * @name_zh 请求 MFA 二维码和密钥信息
     * @description 请求 MFA 二维码和密钥信息
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.assosicateMfaAuthenticator({ authenticatorType: 'totp' })
     *
     * @returns {Promise<IMfaAssociation>}
     * @memberof MfaAuthenticationClient
     */
    MfaAuthenticationClient.prototype.assosicateMfaAuthenticator = function (options) {
        if (options === void 0) { options = { authenticatorType: 'totp' }; }
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/mfa/totp/associate";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: {
                                    authenticator_type: options.authenticatorType
                                }
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name deleteMfaAuthenticator
     * @name_zh 解绑 MFA
     * @description 解绑 MFA
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.deleteMfaAuthenticator()
     *
     * @returns {Promise<IMfaDeleteAssociation>}
     * @memberof MfaAuthenticationClient
     */
    MfaAuthenticationClient.prototype.deleteMfaAuthenticator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/mfa/totp/associate";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'DELETE',
                                url: api
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                code: 200,
                                message: 'TOTP MFA 解绑成功'
                            }];
                }
            });
        });
    };
    /**
     * @name confirmAssosicateMfaAuthenticator
     * @name_zh 确认绑定 MFA
     * @description 确认绑定 MFA
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.confirmAssosicateMfaAuthenticator({ authenticatorType: 'totp', totp: '112233' })
     *
     * @returns {Promise<IMfaConfirmAssociation>}
     * @memberof MfaAuthenticationClient
     */
    MfaAuthenticationClient.prototype.confirmAssosicateMfaAuthenticator = function (options) {
        if (options === void 0) { options = { authenticatorType: 'totp' }; }
        return __awaiter(this, void 0, void 0, function () {
            var api;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/mfa/totp/associate/confirm";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: {
                                    authenticator_type: options.authenticatorType,
                                    totp: options.totp
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { code: 200, message: 'TOTP MFA 绑定成功' }];
                }
            });
        });
    };
    /**
     * @name verifyTotpMfa
     * @name_zh 检验二次验证 MFA 口令
     * @description 检验二次验证 MFA 口令
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.verifyTotpMfa({ authenticatorType: 'totp', totp: '112233' })
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    MfaAuthenticationClient.prototype.verifyTotpMfa = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/mfa/totp/verify";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: {
                                    totp: options.totp
                                },
                                headers: {
                                    authorization: 'Bearer ' + options.mfaToken
                                }
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name verifyTotpRecoveryCode
     * @name_zh 检验二次验证 MFA 恢复代码
     * @description 检验二次验证 MFA 恢复代码
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.verifyTotpRecoveryCode({ authenticatorType: 'totp', totp: '112233' })
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    MfaAuthenticationClient.prototype.verifyTotpRecoveryCode = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/mfa/totp/recovery";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: {
                                    recoveryCode: options.recoveryCode
                                },
                                headers: {
                                    authorization: 'Bearer ' + options.mfaToken
                                }
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return MfaAuthenticationClient;
}());
exports.MfaAuthenticationClient = MfaAuthenticationClient;
