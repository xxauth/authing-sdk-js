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
exports.GroupsManagementClient = void 0;
var graphqlapi_1 = require("../graphqlapi");
/**
 * @class GroupsManagementClient 管理分组
 * @description 此模块用于管理 Authing 分组，可以进行分组的增删改查、分组添加/删除用户、分组添加/删除策略 等操作。
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
 * managementClient.groups.list // 获取分组列表
 * managementClient.groups.create // 创建分组
 * managementClient.groups.listUsers // 获取分组用户列表
 * \`\`\`
 *
 * @name GroupsManagementClient
 */
var GroupsManagementClient = /** @class */ (function () {
    function GroupsManagementClient(options, graphqlClient, tokenProvider) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @name create
     * @name_zh 创建分组
     * @description 创建分组
     *
     * @param {string} code 分组唯一标志符
     * @param {string} name 分组名称
     * @param {string} [description] 描述
     *
     * @example
     * managementClient.groups.create('group', '分组 xxx')
     *
     * @returns {Promise<DeepPartial<Group>>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.create = function (code, name, description) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.createGroup(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            name: name,
                            description: description
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.createGroup];
                }
            });
        });
    };
    /**
     * @name delete
     * @name_zh 删除分组
     * @description 删除分组
     *
     * @param {string} code 分组唯一标志符
     *
     * @example
     * managementClient.groups.delete('rolea')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype["delete"] = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteGroups(this.graphqlClient, this.tokenProvider, {
                            codeList: [code]
                        })];
                    case 1:
                        data = (_a.sent()).deleteGroups;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name update
     * @name_zh 修改分组
     * @description 修改分组
     *
     * @param {string} code 分组唯一标志符
     * @param {Object} input
     * @param {string} [input.name] 新的名称
     * @param {string} [input.description] 新的描述信息
     * @param {string} [input.newCode] 新的唯一标志符
     *
     * @example
     * managementClient.groups.update('group', {newCode: 'newcode'})
     *
     *
     * @returns {Promise<DeepPartial<Group>>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.update = function (code, input) {
        return __awaiter(this, void 0, void 0, function () {
            var description, newCode, name, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        description = input.description, newCode = input.newCode, name = input.name;
                        return [4 /*yield*/, graphqlapi_1.updateGroup(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                name: name,
                                description: description,
                                newCode: newCode
                            })];
                    case 1:
                        data = (_a.sent()).updateGroup;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name detail
     * @name_zh 获取分组详情
     * @description 获取分组详情
     *
     * @param {string} code 分组唯一标志符
     *
     * @example
     * managementClient.groups.detail('manager')
     *
     * @returns {Promise<DeepPartial<Group>>} 分组详情
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.detail = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.group(this.graphqlClient, this.tokenProvider, {
                            code: code
                        })];
                    case 1:
                        data = (_a.sent()).group;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name list
     * @name_zh 获取分组列表
     * @description 获取分组列表
     *
     * @param {number} [page=1] 页码数
     * @param {number} [limit=10] 每页个数
     *
     * @example
     *
     * managementClient.groups.list(1, 10)
     *
     * @returns {Promise<DeepPartial<PaginatedGroups>>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.list = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.getGroups(this.graphqlClient, this.tokenProvider, {
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        data = (_a.sent()).groups;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name deleteMany
     * @name_zh 批量删除分组
     * @description 批量删除分组
     *
     * @param {string[]} codeList 分组唯一标志符列表
     *
     * @example
     * managementClient.groups.deleteMany(['groupa', 'groupb'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.deleteMany = function (codeList) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteGroups(this.graphqlClient, this.tokenProvider, {
                            codeList: codeList
                        })];
                    case 1:
                        data = (_a.sent()).deleteGroups;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name listUsers
     * @name_zh 获取分组用户列表
     * @description 获取分组用户列表
     * @param {string} code 分组唯一标志符
     * @param {number} [page=1] 页码数
     * @param {number} [limit=10] 每页个数
     *
     * @example
     *
     * managementClient.groups.listUsers(code)
     *
     * @returns {Promise<DeepPartial<PaginatedUsers>>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.listUsers = function (code, page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.groupWithUsers(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        data = (_a.sent()).group;
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
     * @param {string} code 分组唯一标志符
     * @param {string[]} userIds 用户 ID 列表
     *
     * @example
     * managementClient.groups.addUsers(code, ['USERID1', 'USERID2'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.addUsers = function (code, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.addUserToGroup(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            userIds: userIds
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.addUserToGroup];
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
     * @param {string} code 分组唯一标志符
     * @param {string[]} userIds 用户 ID 列表
     * @example
     * managementClient.groups.removeUsers(code, ['USERID1', 'USERID2'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.removeUsers = function (code, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.removeUserFromGroup(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            userIds: userIds
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.removeUserFromGroup];
                }
            });
        });
    };
    return GroupsManagementClient;
}());
exports.GroupsManagementClient = GroupsManagementClient;
