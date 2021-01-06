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
exports.SocialAuthenticationClient = void 0;
var utils_1 = require("../utils");
/**
 * @class SocialAuthenticationClient 社会化登录模块
 * @description 此模块封装了社会化登录的功能，可以通过简洁的 API 快速使用社会化登录获取用户信息。
 *
 * 发起社会化登录授权请求：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.social.authorize("github", {
 *    onSuccess: (user) => { console.log(user) },
 *    onError: (code, message) => {  }
 * })
 * \`\`\`
 *
 *
 * @name SocialAuthenticationClient
 */
var SocialAuthenticationClient = /** @class */ (function () {
    function SocialAuthenticationClient(options, tokenProvider, httpClient) {
        this.options = options;
        this.tokenProvider = tokenProvider;
        this.httpClient = httpClient;
    }
    /**
     * @name authorize
     * @name_zh 发送授权登录请求
     * @description 发送授权登录请求，该方法会直接打开一个新窗口，跳转到第三方社会化登录服务商（如 GitHub、微信、钉钉等）的登录授权页面，用户
     * 完成授权之后，会自动关闭此窗口，并触发 onSuccess 回调函数，通过此函数，你可以获取到用户信息。
     *
     * @param {string} provider 社会化登录服务商的标志。
     * @param {object} [options]
     * @param {boolean} [options.popup=true] 是否通过弹窗的方式打开社会化登录窗口，如果设置为 false，将会以 window.open 的方式打开一个新的浏览器  tab 。
     * @param {Function} [options.onSuccess] 用户同意授权事件回调函数，第一个参数为用户信息。
     * @param {Function} [options.onError] 社会化登录失败事件回调函数，第一个参数 code 为错误码，第二个参数 message 为错误提示。详细的错误码列表请见：详细说明请见：[Authing 错误代码列表](https://docs.authing.co/advanced/error-code.html)
     * @param {object} [options.position] 只有当 options.popup 为 ture 的时候有效，弹出窗口的位置，默认为 { w: 585, h: 649 } 。
     *
     * @example
     *
     * // 使用 GitHub 登录
     *
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     *
     * await authenticationClient.social.authorize("github", {
     *    onSuccess: (user) => { console.log(user) },
     *    onError: (code, message) => {  },
     *    // 自定义弹出窗口的位置
     *    position: {
     *      w: 100,
     *      h: 100
     *    }
     * })
     *
     * @example
     *
     * // 使用新建浏览器 tab 的形式打开社会化登录页面
     *
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     *
     * await authenticationClient.social.authorize("github", {
     *    popup: false,
     *    onSuccess: (user) => { console.log(user) },
     *    onError: (code, message) => {  },
     * })
     *
     * @memberof SocialAuthenticationClient
     */
    SocialAuthenticationClient.prototype.authorize = function (provider, options) {
        return __awaiter(this, void 0, void 0, function () {
            var position, _a, popup, onSuccess, onError, url, onMessage;
            return __generator(this, function (_b) {
                options = options || {};
                position = options.position, _a = options.popup, popup = _a === void 0 ? true : _a, onSuccess = options.onSuccess, onError = options.onError;
                url = this.options.host + "/connections/social/" + provider + "/" + this.options.userPoolId + "?from_guard=1";
                onMessage = function (event) {
                    var _a = event.data, code = _a.code, message = _a.message, data = _a.data;
                    // 非 Authing 的事件
                    if (code === undefined) {
                        return;
                    }
                    try {
                        var parsedMsg = JSON.parse(message);
                        message = parsedMsg.message;
                        code = parsedMsg.code;
                    }
                    catch (e) {
                        // do nothing...
                    }
                    if (code === 200) {
                        onSuccess && onSuccess(data);
                    }
                    else {
                        onError && onError(code, message);
                    }
                    window.removeEventListener('message', onMessage);
                };
                window.addEventListener('message', onMessage);
                if (popup) {
                    utils_1.popupCenter(url, position);
                }
                else {
                    window.open(url);
                }
                return [2 /*return*/];
            });
        });
    };
    return SocialAuthenticationClient;
}());
exports.SocialAuthenticationClient = SocialAuthenticationClient;
