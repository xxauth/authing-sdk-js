"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UsersManagementClient = void 0;
var utils_1 = require("./../utils");
var graphqlapi_1 = require("../graphqlapi");
var UsersManagementClient = /** @class */ (function () {
    function UsersManagementClient(options, graphqlClientV2, tokenProvider) {
        this.options = options;
        this.graphqlClientV2 = graphqlClientV2;
        this.tokenProvider = tokenProvider;
    }
    /**
     * 删除用户
     *
     * @param {string} userId
     * @returns
     * @memberof UsersManagementClient
     */
    UsersManagementClient.prototype["delete"] = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteUser(this.graphqlClientV2, this.tokenProvider, {
                            id: userId
                        })];
                    case 1:
                        data = (_a.sent()).deleteUser;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 批量删除用户
     *
     * @param {string[]} userIds
     * @returns
     * @memberof UsersManagementClient
     */
    UsersManagementClient.prototype.deleteMany = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteUsers(this.graphqlClientV2, this.tokenProvider, {
                            ids: userIds
                        })];
                    case 1:
                        data = (_a.sent()).deleteUsers;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 获取用户详情
     *
     * @param {string} userId
     * @returns
     * @memberof UsersManagementClient
     */
    UsersManagementClient.prototype.get = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.user(this.graphqlClientV2, this.tokenProvider, {
                            id: userId
                        })];
                    case 1:
                        data = (_a.sent()).user;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 通过 ID 批量查询用户
     *
     */
    UsersManagementClient.prototype.batch = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.userBatch(this.graphqlClientV2, this.tokenProvider, {
                            ids: ids
                        })];
                    case 1:
                        data = (_a.sent()).userBatch;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 获取用户池用户列表
     * @param page: 页码数, 从 1 开始
     * @param limit: 每页包含的用户数
     *
     * @param {{ page: number, count: number }} options
     * @returns
     * @memberof UsersManagementClient
     */
    UsersManagementClient.prototype.list = function (page, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.users(this.graphqlClientV2, this.tokenProvider, {
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        data = (_a.sent()).users;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 以管理员身份创建用户
     * @param userInfo
     * @param keepPassword
     */
    UsersManagementClient.prototype.create = function (userInfo, keepPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (userInfo && userInfo.password) {
                            userInfo.password = utils_1.encrypt(userInfo.password, this.options.encrptionPublicKey);
                        }
                        return [4 /*yield*/, graphqlapi_1.createUser(this.graphqlClientV2, this.tokenProvider, {
                                userInfo: userInfo,
                                keepPassword: keepPassword
                            })];
                    case 1:
                        user = (_a.sent()).createUser;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @description 修改用户资料
     *
     */
    UsersManagementClient.prototype.update = function (id, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (updates && updates.password) {
                            updates.password = utils_1.encrypt(updates.password, this.options.encrptionPublicKey);
                        }
                        return [4 /*yield*/, graphqlapi_1.updateUser(this.graphqlClientV2, this.tokenProvider, {
                                id: id,
                                input: updates
                            })];
                    case 1:
                        user = (_a.sent()).updateUser;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @description 获取用户的分组列表
     *
     */
    UsersManagementClient.prototype.getGroups = function (userId, page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.getGroupsOfUser(this.graphqlClientV2, this.tokenProvider, {
                            userId: userId,
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        groups = (_a.sent()).groups;
                        return [2 /*return*/, groups];
                }
            });
        });
    };
    /**
     * @description 获取用户的角色列表
     *
     */
    UsersManagementClient.prototype.getRoles = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.getUserRoles(this.graphqlClientV2, this.tokenProvider, {
                            id: userId
                        })];
                    case 1:
                        roles = (_a.sent()).user.roles;
                        return [2 /*return*/, roles];
                }
            });
        });
    };
    /**
     * 根据关键字搜索用户
     * @param query 搜索内容
     * @param options 选项
     */
    UsersManagementClient.prototype.search = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.searchUser(this.graphqlClientV2, this.tokenProvider, __assign({ query: query }, options))];
                    case 1:
                        users = (_a.sent()).searchUser;
                        // @ts-ignore
                        return [2 /*return*/, users];
                }
            });
        });
    };
    UsersManagementClient.prototype.refreshToken = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.refreshToken(this.graphqlClientV2, this.tokenProvider, {
                            id: id
                        })];
                    case 1:
                        data = (_a.sent()).refreshToken;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return UsersManagementClient;
}());
exports.UsersManagementClient = UsersManagementClient;
