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
exports.HttpClient = void 0;
var version_1 = require("../version");
var axios_1 = require("axios");
var HttpClient = /** @class */ (function () {
    function HttpClient(options, tokenProvider) {
        this.options = options;
        this.tokenProvider = tokenProvider;
        this.axios = axios_1["default"].create({
            withCredentials: true
        });
    }
    HttpClient.prototype.request = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, token, data, code, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'x-authing-sdk-version': "js:" + version_1.SDK_VERSION,
                            'x-authing-userpool-id': this.options.userPoolId || '',
                            'x-authing-request-from': this.options.requestFrom || 'sdk',
                            'x-authing-app-id': this.options.appId || ''
                        };
                        if (!!(config && config.headers && config.headers.authorization)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tokenProvider.getToken()];
                    case 1:
                        token = _a.sent();
                        token && (headers.Authorization = "Bearer " + token);
                        return [3 /*break*/, 3];
                    case 2:
                        headers.authorization = config.headers.authorization;
                        _a.label = 3;
                    case 3:
                        config.headers = headers;
                        config.timeout = this.options.timeout;
                        return [4 /*yield*/, this.axios.request(config)];
                    case 4:
                        data = (_a.sent()).data;
                        code = data.code, message = data.message;
                        if (code !== 200) {
                            this.options.onError(code, message, data.data);
                            throw new Error(JSON.stringify({ code: code, message: message, data: data.data }));
                        }
                        return [2 /*return*/, data.data];
                }
            });
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
