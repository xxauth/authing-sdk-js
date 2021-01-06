"use strict";
exports.__esModule = true;
exports.AuthenticationTokenProvider = void 0;
var tokenKey = '_authing_token';
var userKey = '_authing_user';
var AuthenticationTokenProvider = /** @class */ (function () {
    function AuthenticationTokenProvider(options) {
        this.options = options;
        // 为了兼容服务端不支持 localStorage 的情况
        this.token = null;
        this.user = null;
    }
    AuthenticationTokenProvider.prototype.setToken = function (token) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(tokenKey, token);
        }
        else {
            this.token = token;
        }
    };
    AuthenticationTokenProvider.prototype.getToken = function () {
        return typeof localStorage !== 'undefined'
            ? localStorage.getItem(tokenKey) || ''
            : this.token;
    };
    AuthenticationTokenProvider.prototype.getUser = function () {
        return typeof localStorage !== 'undefined'
            ? localStorage.getItem(userKey)
                ? JSON.parse(localStorage.getItem(userKey))
                : null
            : this.user;
    };
    AuthenticationTokenProvider.prototype.setUser = function (user) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(userKey, JSON.stringify(user));
            localStorage.setItem(tokenKey, user.token);
        }
        else {
            this.user = user;
            this.token = user.token;
        }
    };
    AuthenticationTokenProvider.prototype.clearUser = function () {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(userKey);
            localStorage.removeItem(tokenKey);
        }
        else {
            this.user = null;
            this.token = null;
        }
    };
    return AuthenticationTokenProvider;
}());
exports.AuthenticationTokenProvider = AuthenticationTokenProvider;
