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
var GraphqlClient_1 = require("../common/GraphqlClient");
var ManagementTokenProvider_1 = require("./ManagementTokenProvider");
var UserpoolManagementClient_1 = require("./UserpoolManagementClient");
var UsersManagementClient_1 = require("./UsersManagementClient");
var graphqlapi_1 = require("../graphqlapi");
var HttpClient_1 = require("../common/HttpClient");
var axios_1 = require("axios");
var RolesManagementClient_1 = require("./RolesManagementClient");
var PoliciesManagementClient_1 = require("./PoliciesManagementClient");
var UdfManagementClient_1 = require("./UdfManagementClient");
var GroupsManagementClient_1 = require("./GroupsManagementClient");
var AclManagementClient_1 = require("./AclManagementClient");
var WhitelistManagementClient_1 = require("./WhitelistManagementClient");
var jwt_decode_1 = require("jwt-decode");
var utils_1 = require("../utils");
var DEFAULT_OPTIONS = {
    timeout: 10000,
    encrptionPublicKey: "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4xKeUgQ+Aoz7TLfAfs9+paePb\n5KIofVthEopwrXFkp8OCeocaTHt9ICjTT2QeJh6cZaDaArfZ873GPUn00eOIZ7Ae\n+TiA2BKHbCvloW3w5Lnqm70iSsUi5Fmu9/2+68GZRH9L7Mlh8cFksCicW2Y2W2uM\nGKl64GDcIq3au+aqJQIDAQAB\n-----END PUBLIC KEY-----",
    onError: function (code, message) {
        throw { code: code, message: message };
    },
    host: 'https://core.authing.cn',
    requestFrom: 'sdk',
    encryptFunction: utils_1.encrypt
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
        this.graphqlClient = new (this.options.graphqlClient || GraphqlClient_1.GraphqlClient)(graphqlApiEndpointV2, this.options);
        this.tokenProvider = new ManagementTokenProvider_1.ManagementTokenProvider(this.options, this.graphqlClient);
        this.httpClient = new (this.options.httpClient || HttpClient_1.HttpClient)(this.options, this.tokenProvider);
        this.users = new UsersManagementClient_1.UsersManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
        this.userpool = new UserpoolManagementClient_1.UserPoolManagementClient(this.options, this.httpClient, this.graphqlClient, this.tokenProvider);
        this.org = new OrgManagementClient_1.OrgManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
        this.roles = new RolesManagementClient_1.RolesManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.policies = new PoliciesManagementClient_1.PoliciesManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.udf = new UdfManagementClient_1.UdfManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.acl = new AclManagementClient_1.AclManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.whitelist = new WhitelistManagementClient_1.WhitelistManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.groups = new GroupsManagementClient_1.GroupsManagementClient(this.options, this.graphqlClient, this.tokenProvider);
    }
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
                    case 0: return [4 /*yield*/, graphqlapi_1.sendEmail(this.graphqlClient, this.tokenProvider, { email: email, scene: scene })];
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
            var _a, fetchUserDetail, decoded, data, id, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        _a = options.fetchUserDetail, fetchUserDetail = _a === void 0 ? false : _a;
                        if (!token)
                            return [2 /*return*/, null];
                        decoded = null;
                        try {
                            decoded = jwt_decode_1["default"](token);
                        }
                        catch (error) {
                            return [2 /*return*/, null];
                        }
                        data = decoded.data;
                        if (!!fetchUserDetail) return [3 /*break*/, 1];
                        return [2 /*return*/, data];
                    case 1:
                        id = data.id;
                        return [4 /*yield*/, this.users.detail(id)];
                    case 2:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return ManagementClient;
}());
exports.ManagementClient = ManagementClient;
