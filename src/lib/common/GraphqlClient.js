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
exports.GraphqlClient = void 0;
var version_1 = require("../version");
var axios_1 = require("axios");
var GraphqlClient = /** @class */ (function () {
    function GraphqlClient(endpoint, options) {
        this.endpoint = endpoint;
        this.options = options;
        this.axios = axios_1["default"].create({
            withCredentials: true
        });
    }
    GraphqlClient.prototype.request = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, token, variables, headers, data, errors, responseData, error_1, errmsg_1, errcode_1, data_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = options.query, token = options.token, variables = options.variables;
                        headers = {
                            'content-type': 'application/json',
                            'x-authing-sdk-version': "js:" + version_1.SDK_VERSION,
                            'x-authing-userpool-id': this.options.userPoolId || '',
                            'x-authing-request-from': this.options.requestFrom || 'sdk',
                            'x-authing-app-id': this.options.appId || ''
                        };
                        token && (headers.Authorization = "Bearer " + token);
                        data = null;
                        errors = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.axios({
                                url: this.endpoint,
                                data: {
                                    query: query,
                                    variables: variables
                                },
                                method: 'post',
                                headers: headers,
                                timeout: this.options.timeout
                            })];
                    case 2:
                        responseData = (_a.sent()).data;
                        data = responseData.data;
                        errors = responseData.errors;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this.options.onError(500, '网络请求错误', null);
                        throw { code: 500, message: '网络请求错误', data: null };
                    case 4:
                        if ((errors === null || errors === void 0 ? void 0 : errors.length) > 0) {
                            errmsg_1 = null;
                            errcode_1 = null;
                            data_1 = null;
                            errors.map(function (err) {
                                var msg = err.message;
                                var code = msg.code, message = msg.message, _data = msg.data;
                                errcode_1 = code;
                                errmsg_1 = message;
                                data_1 = _data;
                                _this.options.onError(code, message, data_1);
                            });
                            throw { code: errcode_1, message: errmsg_1, data: data_1 };
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return GraphqlClient;
}());
exports.GraphqlClient = GraphqlClient;
