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
exports.RolesManagementClient = void 0;
var graphql_v2_1 = require("../../types/graphql.v2");
var graphqlapi_1 = require("../graphqlapi");
/**
 * @class RolesManagementClient 管理角色
 * @description 此模块用于管理 Authing 角色，可以进行角色的增删改查、角色添加/删除用户、角色添加/删除策略 等操作。
 *
 * @example
 *
 * 请使用以下方式使用该模块，而不要直接初始化该模块：
 * \`\`\`javascript
 * import { ManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.roles.list // 获取角色列表
 * managementClient.roles.create // 创建角色
 * managementClient.roles.listUsers // 获取角色用户列表
 * \`\`\`
 *
 * @name RolesManagementClient
 */
var RolesManagementClient = /** @class */ (function () {
    function RolesManagementClient(options, graphqlClient, tokenProvider) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @name create
     * @name_zh 创建角色
     * @description 创建角色
     *
     * @param {string} code 角色唯一标志符
     * @param {string} [description] 描述
     *
     * @example
     * managementClient.roles.create('rolea', 'RoleA')
     *
     * @returns {Promise<DeepPartial<Role>>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.create = function (code, description) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.addRole(this.graphqlClient, this.tokenProvider, {
                            code: code,
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
     * @name delete
     * @name_zh 删除角色
     * @description 删除角色
     *
     * @param {string} code 角色唯一标志符
     *
     * @example
     * managementClient.roles.delete('rolea')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype["delete"] = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteRole(this.graphqlClient, this.tokenProvider, {
                            code: code
                        })];
                    case 1:
                        data = (_a.sent()).deleteRole;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name deleteMany
     * @name_zh 批量删除角色
     * @description 批量删除角色
     *
     * @param {string[]} codeList 角色唯一标志符列表
     *
     * @example
     * managementClient.roles.delete(['rolea'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.deleteMany = function (codeList) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteRoles(this.graphqlClient, this.tokenProvider, {
                            codeList: codeList
                        })];
                    case 1:
                        data = (_a.sent()).deleteRoles;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name update
     * @name_zh 修改角色
     * @description 修改角色
     *
     * @param {string} code 角色唯一标志符
     * @param {Object} input
     * @param {string} input.description 描述信息
     * @param {string} input.newCode 新的唯一标志符
     *
     * @example
     * managementClient.roles.update('rolea', {newCode: 'newcode'})
     *
     *
     * @returns {Promise<DeepPartial<Role>>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.update = function (code, input) {
        return __awaiter(this, void 0, void 0, function () {
            var description, newCode, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        description = input.description, newCode = input.newCode;
                        return [4 /*yield*/, graphqlapi_1.updateRole(this.graphqlClient, this.tokenProvider, {
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
     *
     * @name detail
     * @name_zh 获取角色详情
     * @description 获取角色详情
     *
     * @param {string} code 角色唯一标志符
     *
     * @example
     * managementClient.roles.detail('manager')
     *
     * @returns {Promise<DeepPartial<Role>>} 角色详情
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.detail = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.role(this.graphqlClient, this.tokenProvider, {
                            code: code
                        })];
                    case 1:
                        data = (_a.sent()).role;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name list
     * @name_zh 获取角色列表
     * @description 获取角色列表
     *
     * @param {number} [page=1] 页码数
     * @param {number} [limit=10] 每页个数
     * @example
     * managementClient.roles.list(2, 10)
     *
     * @returns {Promise<DeepPartial<PaginatedRoles>>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.list = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.roles(this.graphqlClient, this.tokenProvider, {
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
    /**
     * @name listUsers
     * @name_zh 获取角色用户列表
     * @description 获取角色用户列表
     * @param {string} code 角色唯一标志符
     * @example
     * managementClient.roles.listUsers(code)
     *
     * @returns {Promise<DeepPartial<PaginatedUsers>>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.listUsers = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.roleWithUsers(this.graphqlClient, this.tokenProvider, {
                            code: code
                        })];
                    case 1:
                        data = (_a.sent()).role;
                        return [2 /*return*/, data.users];
                }
            });
        });
    };
    /**
     * @name addUsers
     * @name_zh 添加用户
     * @description 添加用户
     *
     * @param {string} code 角色唯一标志符
     * @param {string[]} userIds 用户 ID 列表
     * @example
     * managementClient.roles.addUsers(code, ['USERID1', 'USERID2'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.addUsers = function (code, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.assignRole(this.graphqlClient, this.tokenProvider, {
                            roleCode: code,
                            userIds: userIds
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.assignRole];
                }
            });
        });
    };
    /**
     * @name removeUsers
     * @name_zh 移除用户
     *
     * @description 移除用户
     *
     * @param {string} code 角色唯一标志符
     * @param {string[]} userIds 用户 ID 列表
     * @example
     * managementClient.roles.removeUsers(code, ['USERID1', 'USERID2'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.removeUsers = function (code, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.revokeRole(this.graphqlClient, this.tokenProvider, {
                            roleCode: code,
                            userIds: userIds
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.revokeRole];
                }
            });
        });
    };
    /**
     * @name listPolicies
     * @name_zh 获取角色策略列表
     *
     * @description 获取角色策略列表
     *
     * @param {string} code 角色唯一标志符
     * @param {number} [page=1] 页码数
     * @param {number} [limit=10] 页码个数
     * @example
     *  managementClient.roles.listPolicies('codea', 1, 10)
     *
     * @returns {Promise<PaginatedPolicyAssignments>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.listPolicies = function (code, page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.policyAssignments(this.graphqlClient, this.tokenProvider, {
                            targetType: graphql_v2_1.PolicyAssignmentTargetType.User,
                            targetIdentifier: code,
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        data = (_a.sent()).policyAssignments;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name addPolicies
     * @name_zh 授权策略
     *
     * @description 给角色授权策略策略
     *
     * @param {string} code 角色唯一标志符
     * @param {string[]} policies 策略列表
     * @example
     * managementClient.roles.addPolicies('rolea', ['PolicyA', 'PolicyB'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.addPolicies = function (code, policies) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.addPolicyAssignments(this.graphqlClient, this.tokenProvider, {
                            targetType: graphql_v2_1.PolicyAssignmentTargetType.User,
                            targetIdentifiers: [code],
                            policies: policies
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.addPolicyAssignments];
                }
            });
        });
    };
    /**
     * @name removePolicies
     * @name_zh 角色移除策略
     *
     * @description 角色移除策略
     *
     * @param {string} code 角色唯一标志符
     * @param {string[]} policies 策略列表
     * @example
     * managementClient.roles.removePolicies('rolea', ['PolicyA', 'PolicyB'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof RolesManagementClient
     */
    RolesManagementClient.prototype.removePolicies = function (code, policies) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.removePolicyAssignments(this.graphqlClient, this.tokenProvider, {
                            targetType: graphql_v2_1.PolicyAssignmentTargetType.User,
                            targetIdentifiers: [code],
                            policies: policies
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.removePolicyAssignments];
                }
            });
        });
    };
    return RolesManagementClient;
}());
exports.RolesManagementClient = RolesManagementClient;
