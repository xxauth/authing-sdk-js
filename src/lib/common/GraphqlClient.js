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
var graphql_request_1 = require("graphql-request");
var GraphqlClient = /** @class */ (function () {
    function GraphqlClient(endpoint, options) {
        this.endpoint = endpoint;
        this.options = options;
    }
    GraphqlClient.prototype.request = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, token, variables, headers, graphQLClient, error_1, errmsg_1, errcode_1, response, errors;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = options.query, token = options.token, variables = options.variables;
                        headers = {
                            'x-authing-sdk-version': version_1.SDK_VERSION,
                            'x-authing-userpool-id': this.options.userPoolId,
                            'x-authing-request-from': this.options.requestFrom || 'sdk',
                            'x-authing-app-id': this.options.appId || ''
                        };
                        token && (headers.Authorization = "Bearer " + token);
                        graphQLClient = new graphql_request_1.GraphQLClient(this.endpoint, {
                            headers: headers
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, graphQLClient.request(query, variables)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        errmsg_1 = null;
                        errcode_1 = null;
                        response = error_1.response;
                        errors = response.errors;
                        errors.map(function (err) {
                            var msg = err.message;
                            var _a = JSON.parse(msg), code = _a.code, message = _a.message;
                            errcode_1 = code;
                            errmsg_1 = message;
                            _this.options.onError(code, message);
                        });
                        throw { code: errcode_1, message: errmsg_1 };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return GraphqlClient;
}());
exports.GraphqlClient = GraphqlClient;