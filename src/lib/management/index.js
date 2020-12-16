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
exports.ManagementClient = void 0;
var OrgManagementClient_1 = require("./OrgManagementClient");
var AccessControlManagementClient_1 = require("./AccessControlManagementClient");
var GraphqlClient_1 = require("./../common/GraphqlClient");
var ManagementTokenProvider_1 = require("./ManagementTokenProvider");
var UserpoolManagementClient_1 = require("./UserpoolManagementClient");
var UsersManagementClient_1 = require("./UsersManagementClient");
var graphqlapi_1 = require("../graphqlapi");
var utils_1 = require("../utils");
var HttpClient_1 = require("../common/HttpClient");
var axios_1 = require("axios");
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
var ManagementClient = /** @class */ (function () {
    function ManagementClient(options) {
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        if (!this.options.userPoolId && !this.options.appId)
            throw new Error('请提供 userPoolId 或者 appId!');
        var graphqlApiEndpointV2 = this.options.host + "/v2/graphql";
        if (!this.options.secret && !this.options.accessToken) {
            this.options.onError(1000, 'Init Management Client failed, must provide at least secret or accessToken !');
        }
        axios_1["default"].defaults.baseURL = this.options.host;
        this.graphqlClientV2 = new GraphqlClient_1.GraphqlClient(graphqlApiEndpointV2, this.options);
        this.tokenProvider = new ManagementTokenProvider_1.ManagementTokenProvider(this.options, this.graphqlClientV2);
        this.httpClient = new HttpClient_1.HttpClient(this.options, this.tokenProvider);
        this.users = new UsersManagementClient_1.UsersManagementClient(this.options, this.graphqlClientV2, this.tokenProvider);
        this.userpool = new UserpoolManagementClient_1.UserPoolManagementClient(this.options, this.httpClient, this.graphqlClientV2, this.tokenProvider);
        this.acl = new AccessControlManagementClient_1.AccessControlManagementClient(this.options, this.graphqlClientV2, this.tokenProvider);
        this.org = new OrgManagementClient_1.OrgManagementClient(this.options, this.graphqlClientV2, this.graphqlClientV2, this.tokenProvider);
    }
    ManagementClient.prototype.getConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var detail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.userpoolConfig) {
                            return [2 /*return*/, this.userpoolConfig];
                        }
                        return [4 /*yield*/, this.userpool.detail()];
                    case 1:
                        detail = _a.sent();
                        this.userpoolConfig = detail;
                        return [2 /*return*/, detail];
                }
            });
        });
    };
    ManagementClient.prototype.isDomainAvaliable = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.isDomainAvaliable(this.graphqlClientV2, this.tokenProvider, { domain: domain })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.isDomainAvaliable];
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
    ManagementClient.prototype.sendEmail = function (email, scene) {
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
    /**
     * @description 检测登录状态
     *
     */
    ManagementClient.prototype.checkLoginStatus = function (token, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fetchUserDetail, decoded, config, error_1, data, id, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        _a = options.fetchUserDetail, fetchUserDetail = _a === void 0 ? false : _a;
                        if (!token)
                            return [2 /*return*/, null];
                        decoded = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getConfig()];
                    case 2:
                        config = _b.sent();
                        decoded = utils_1.verifyToken(token, config.jwtSecret);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, null];
                    case 4:
                        data = decoded.data;
                        if (!!fetchUserDetail) return [3 /*break*/, 5];
                        return [2 /*return*/, data];
                    case 5:
                        id = data.id;
                        return [4 /*yield*/, this.users.get(id)];
                    case 6:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    ManagementClient.prototype.userExists = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var username, userExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = options.username;
                        return [4 /*yield*/, graphqlapi_1.userExists(this.graphqlClientV2, this.tokenProvider, {
                                userPoolId: this.options.userPoolId,
                                username: username
                            })];
                    case 1:
                        userExist = (_a.sent()).userExist;
                        return [2 /*return*/, userExist];
                }
            });
        });
    };
    ManagementClient.prototype.getWhiteList = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var whitelist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.getWhiteList(this.graphqlClientV2, this.tokenProvider, {
                            type: type
                        })];
                    case 1:
                        whitelist = (_a.sent()).whitelist;
                        return [2 /*return*/, whitelist];
                }
            });
        });
    };
    ManagementClient.prototype.addWhiteList = function (type, list) {
        return __awaiter(this, void 0, void 0, function () {
            var whiteList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.addWhiteList(this.graphqlClientV2, this.tokenProvider, {
                            type: type,
                            list: list
                        })];
                    case 1:
                        whiteList = (_a.sent()).addWhitelist;
                        return [2 /*return*/, whiteList];
                }
            });
        });
    };
    ManagementClient.prototype.removeWhiteList = function (type, list) {
        return __awaiter(this, void 0, void 0, function () {
            var whiteList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.removeWhiteList(this.graphqlClientV2, this.tokenProvider, {
                            type: type,
                            list: list
                        })];
                    case 1:
                        whiteList = (_a.sent()).removeWhitelist;
                        return [2 /*return*/, whiteList];
                }
            });
        });
    };
    /**
     * @description 查询用户池定义的自定义字段
     *
     */
    ManagementClient.prototype.udf = function (targetType) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.udf(this.graphqlClientV2, this.tokenProvider, {
                            targetType: targetType
                        })];
                    case 1:
                        list = (_a.sent()).udf;
                        return [2 /*return*/, list];
                }
            });
        });
    };
    /**
     * @description 添加自定义字段
     *
     */
    ManagementClient.prototype.addUdf = function (
    /** 目标类型 */
    targetType, 
    /** 字段 key */
    key, 
    /** 数据类型 */
    dataType, 
    /** 字段 label */
    label) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.addUdf(this.graphqlClientV2, this.tokenProvider, {
                            targetType: targetType,
                            dataType: dataType,
                            key: key,
                            label: label
                        })];
                    case 1:
                        list = (_a.sent()).addUdf;
                        return [2 /*return*/, list];
                }
            });
        });
    };
    /**
     * @description 删除自定义字段
     *
     */
    ManagementClient.prototype.removeUdf = function (
    /** 目标类型 */
    targetType, 
    /** 字段 key */
    key) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.removeUdf(this.graphqlClientV2, this.tokenProvider, {
                            targetType: targetType,
                            key: key
                        })];
                    case 1:
                        list = (_a.sent()).removeUdf;
                        return [2 /*return*/, list];
                }
            });
        });
    };
    return ManagementClient;
}());
exports.ManagementClient = ManagementClient;
