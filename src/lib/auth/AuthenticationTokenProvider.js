"use strict";
exports.__esModule = true;
exports.AuthenticationTokenProvider = void 0;
var tokenKey = '_authing_token';
var userKey = '_authing_user';
var AuthenticationTokenProvider = /** @class */ (function () {
    function AuthenticationTokenProvider(options) {
        this.options = options;
    }
    AuthenticationTokenProvider.prototype.getAccessToken = function () {
        return localStorage.getItem(tokenKey) || '';
    };
    AuthenticationTokenProvider.prototype.getUser = function () {
        return localStorage.getItem(userKey)
            ? JSON.parse(localStorage.getItem(userKey))
            : null;
    };
    AuthenticationTokenProvider.prototype.setUser = function (user) {
        localStorage.setItem(userKey, JSON.stringify(user));
        localStorage.setItem(tokenKey, user.token);
    };
    AuthenticationTokenProvider.prototype.clearUser = function () {
        localStorage.removeItem(userKey);
        localStorage.removeItem(tokenKey);
    };
    return AuthenticationTokenProvider;
}());
exports.AuthenticationTokenProvider = AuthenticationTokenProvider;
