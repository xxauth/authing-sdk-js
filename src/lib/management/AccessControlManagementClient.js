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
exports.AccessControlManagementClient = void 0;
var graphqlapi_1 = require("../graphqlapi");
var AccessControlManagementClient = /** @class */ (function () {
    function AccessControlManagementClient(options, graphqlClientV2, tokenProvider) {
        this.options = options;
        this.graphqlClientV2 = graphqlClientV2;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @description 获取用户池角色列表
     *
     * @param code 角色唯一标志
     * @param options
     *
     */
    AccessControlManagementClient.prototype.role = function (code, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, getUsers, data, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = options.getUsers, getUsers = _a === void 0 ? false : _a;
                        if (!!getUsers) return [3 /*break*/, 2];
                        return [4 /*yield*/, graphqlapi_1.role(this.graphqlClientV2, this.tokenProvider, {
                                code: code
                            })];
                    case 1:
                        data = (_b.sent()).role;
                        return [2 /*return*/, data];
                    case 2: return [4 /*yield*/, graphqlapi_1.roleWithUsers(this.graphqlClientV2, this.tokenProvider, {
                            code: code
                        })];
                    case 3:
                        data = (_b.sent()).role;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 获取用户池角色列表
     *
     */
    AccessControlManagementClient.prototype.roles = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.roles(this.graphqlClientV2, this.tokenProvider, {
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        data = (_a.sent()).roles;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AccessControlManagementClient.prototype.assignRole = function (roleCode, targets) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userIds, _b, groupCodes, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = targets.userIds, userIds = _a === void 0 ? [] : _a, _b = targets.groupCodes, groupCodes = _b === void 0 ? [] : _b;
                        return [4 /*yield*/, graphqlapi_1.assignRole(this.graphqlClientV2, this.tokenProvider, {
                                code: roleCode,
                                userIds: userIds,
                                groupCodes: groupCodes
                            })];
                    case 1:
                        res = _c.sent();
                        return [2 /*return*/, res.assignRole];
                }
            });
        });
    };
    AccessControlManagementClient.prototype.revokeRole = function (roleCode, targets) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userIds, _b, groupCodes, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = targets.userIds, userIds = _a === void 0 ? [] : _a, _b = targets.groupCodes, groupCodes = _b === void 0 ? [] : _b;
                        return [4 /*yield*/, graphqlapi_1.revokeRole(this.graphqlClientV2, this.tokenProvider, {
                                code: roleCode,
                                userIds: userIds,
                                groupCodes: groupCodes
                            })];
                    case 1:
                        res = _c.sent();
                        return [2 /*return*/, res.revokeRole];
                }
            });
        });
    };
    /**
     * @description 添加角色
     *
     */
    AccessControlManagementClient.prototype.createRole = function (code, description, parent) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.addRole(this.graphqlClientV2, this.tokenProvider, {
                            code: code,
                            parent: parent,
                            description: description
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.createRole];
                }
            });
        });
    };
    /**
     * @description 修改角色
     *
     */
    AccessControlManagementClient.prototype.updateRole = function (code, input) {
        return __awaiter(this, void 0, void 0, function () {
            var description, newCode, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        description = input.description, newCode = input.newCode;
                        return [4 /*yield*/, graphqlapi_1.updateRole(this.graphqlClientV2, this.tokenProvider, {
                                code: code,
                                description: description,
                                newCode: newCode
                            })];
                    case 1:
                        data = (_a.sent()).updateRole;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 判断某个用户是否对某个资源有某个操作权限
     *
     * @param userId: 用户ID
     * @param action: 操作
     * @param resouceCode: 资源代码
     *
     */
    AccessControlManagementClient.prototype.isAllowed = function (userId, action, resource) {
        return __awaiter(this, void 0, void 0, function () {
            var isActionAllowed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.isAllowed(this.graphqlClientV2, this.tokenProvider, {
                            resource: resource,
                            action: action,
                            userId: userId
                        })];
                    case 1:
                        isActionAllowed = (_a.sent()).isActionAllowed;
                        return [2 /*return*/, isActionAllowed];
                }
            });
        });
    };
    /**
     * @description 判断某个用户是否对某个资源没有某个操作权限
     *
     * @param userId: 用户ID
     * @param action: 操作
     * @param resouceCode: 资源代码
     *
     */
    AccessControlManagementClient.prototype.isDenied = function (userId, action, resource) {
        return __awaiter(this, void 0, void 0, function () {
            var isActionDenied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.isDenied(this.graphqlClientV2, this.tokenProvider, {
                            resource: resource,
                            action: action,
                            userId: userId
                        })];
                    case 1:
                        isActionDenied = (_a.sent()).isActionDenied;
                        return [2 /*return*/, isActionDenied];
                }
            });
        });
    };
    AccessControlManagementClient.prototype.groups = function (arg1, arg2) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, data, userId, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!arg2) return [3 /*break*/, 2];
                        page = 1;
                        limit = 2;
                        return [4 /*yield*/, graphqlapi_1.getGroups(this.graphqlClientV2, this.tokenProvider, {
                                page: page,
                                limit: limit
                            })];
                    case 1:
                        data = (_a.sent()).groups;
                        // @ts-ignore
                        return [2 /*return*/, data];
                    case 2:
                        userId = arg1;
                        return [4 /*yield*/, graphqlapi_1.getGroups(this.graphqlClientV2, this.tokenProvider, {
                                userId: userId,
                                page: 1,
                                limit: -1
                            })];
                    case 3:
                        data = (_a.sent()).groups;
                        // @ts-ignore
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AccessControlManagementClient.prototype.addUserToGroup = function (userId, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.addUserToGroup(this.graphqlClientV2, this.tokenProvider, {
                            groupId: groupId,
                            userId: userId
                        })];
                    case 1:
                        data = (_a.sent()).addUserToGroup;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AccessControlManagementClient.prototype.allow = function (
    /** 用户 ID */
    userId, 
    /** 资源 */
    resource, 
    /** 操作 */
    action) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.allow(this.graphqlClientV2, this.tokenProvider, {
                            resource: resource,
                            action: action,
                            userId: userId
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AccessControlManagementClient;
}());
exports.AccessControlManagementClient = AccessControlManagementClient;
