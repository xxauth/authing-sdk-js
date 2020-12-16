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
exports.OrgManagementClient = void 0;
var utils_1 = require("../utils");
var lodash_1 = require("lodash");
var graphqlapi_1 = require("../graphqlapi");
var axios_1 = require("axios");
var version_1 = require("../version");
var OrgManagementClient = /** @class */ (function () {
    function OrgManagementClient(options, graphqlClient, graphqlClientV2, tokenProvider) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.graphqlClientV2 = graphqlClientV2;
        this.tokenProvider = tokenProvider;
    }
    OrgManagementClient.prototype.buildTree = function (org) {
        org.tree = utils_1["default"](lodash_1["default"].cloneDeep(org.nodes));
        return org;
    };
    /**
     * @description 获取用户池组织机构列表
     * @param page 从 1 开始，默认为 1
     * @param limit 默认为 10
     *
     */
    OrgManagementClient.prototype.list = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, list, totalCount;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.orgs(this.graphqlClientV2, this.tokenProvider, {
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        _a = (_b.sent()).orgs, list = _a.list, totalCount = _a.totalCount;
                        return [2 /*return*/, {
                                totalCount: totalCount,
                                list: list.map(function (org) { return _this.buildTree(org); })
                            }];
                }
            });
        });
    };
    /**
     * 创建组织机构
     * @memberof OrgManagementClient
     */
    OrgManagementClient.prototype.create = function (name, description, code) {
        return __awaiter(this, void 0, void 0, function () {
            var org;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.createOrg(this.graphqlClientV2, this.tokenProvider, {
                            name: name,
                            description: description,
                            code: code
                        })];
                    case 1:
                        org = (_a.sent()).createOrg;
                        return [2 /*return*/, org];
                }
            });
        });
    };
    /**
     * 往组织机构中添加一个节点
     * @memberof OrgManagementClient
     */
    OrgManagementClient.prototype.addNode = function (orgId, parentNodeId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var name, code, order, nameI18n, description, descriptionI18n, org;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = data.name, code = data.code, order = data.order, nameI18n = data.nameI18n, description = data.description, descriptionI18n = data.descriptionI18n;
                        return [4 /*yield*/, graphqlapi_1.addNode(this.graphqlClientV2, this.tokenProvider, {
                                orgId: orgId,
                                parentNodeId: parentNodeId,
                                name: name,
                                code: code,
                                order: order,
                                nameI18n: nameI18n,
                                description: description,
                                descriptionI18n: descriptionI18n
                            })];
                    case 1:
                        org = (_a.sent()).addNode;
                        return [2 /*return*/, this.buildTree(org)];
                }
            });
        });
    };
    OrgManagementClient.prototype.updateNode = function (id, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var name, code, description, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = updates.name, code = updates.code, description = updates.description;
                        return [4 /*yield*/, graphqlapi_1.updateNode(this.graphqlClientV2, this.tokenProvider, {
                                id: id,
                                name: name,
                                code: code,
                                description: description
                            })];
                    case 1:
                        node = (_a.sent()).updateNode;
                        return [2 /*return*/, node];
                }
            });
        });
    };
    /**
     * 通过 ID 查询组织机构
     * @memberof OrgManagementClient
     */
    OrgManagementClient.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.org(this.graphqlClientV2, this.tokenProvider, {
                            id: id
                        })];
                    case 1:
                        data = (_a.sent()).org;
                        return [2 /*return*/, this.buildTree(data)];
                }
            });
        });
    };
    /**
     * 删除组织机构树
     * @param {string} id
     * @returns
     * @memberof OrgManagementClient
     */
    OrgManagementClient.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteOrg(this.graphqlClient, this.tokenProvider, {
                            _id: id
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.deleteOrg];
                }
            });
        });
    };
    /**
     * 删除组织机构树中的某一个节点
     */
    OrgManagementClient.prototype.deleteNode = function (orgId, nodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteNode(this.graphqlClientV2, this.tokenProvider, {
                            orgId: orgId,
                            nodeId: nodeId
                        })];
                    case 1:
                        data = (_a.sent()).deleteNode;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 移动节点
     */
    OrgManagementClient.prototype.moveNode = function (orgId, nodeId, targetParentId) {
        return __awaiter(this, void 0, void 0, function () {
            var org;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.moveNode(this.graphqlClientV2, this.tokenProvider, {
                            orgId: orgId,
                            nodeId: nodeId,
                            targetParentId: targetParentId
                        })];
                    case 1:
                        org = (_a.sent()).moveNode;
                        return [2 /*return*/, this.buildTree(org)];
                }
            });
        });
    };
    /**
     * 判断一个节点是不是组织树的根节点
     * @param {string} orgId
     * @param {string} nodeId
     * @returns
     * @memberof OrgManagementClient
     */
    OrgManagementClient.prototype.isRoot = function (orgId, nodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.isRootNodeOfOrg(this.graphqlClient, this.tokenProvider, {
                            input: {
                                orgId: orgId,
                                groupId: nodeId
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.isRootNodeOfOrg];
                }
            });
        });
    };
    /**
     * 查询节点子节点列表
     * @param {string} orgId
     * @param {string} nodeId
     * @returns
     * @memberof OrgManagementClient
     */
    OrgManagementClient.prototype.childrenNodes = function (orgId, nodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.getChildrenNodes(this.graphqlClientV2, this.tokenProvider, {
                            orgId: orgId,
                            nodeId: nodeId
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.childrenNodes];
                }
            });
        });
    };
    /**
     * 查询组织机构树根节点
     * @memberof OrgManagementClient
     */
    OrgManagementClient.prototype.rootNode = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.orgRootNode(this.graphqlClient, this.tokenProvider, {
                            _id: id
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.orgRootNode];
                }
            });
        });
    };
    /**
     * 根据 Group 的自定义字段查询节点
     *
     * @param {SearchOrgNodesVariables} options
     * @memberof OrgManagementClient
     */
    OrgManagementClient.prototype.searchNodes = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var orgId, _a, name, _b, metadata, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        orgId = options.orgId, _a = options.name, name = _a === void 0 ? '' : _a, _b = options.metadata, metadata = _b === void 0 ? [] : _b;
                        if (!name && metadata.length === 0) {
                            this.options.onError(500, 'Plesas Provide name or metadata');
                        }
                        if (metadata) {
                            metadata = metadata.map(function (metadata) {
                                if (typeof metadata.value !== 'string') {
                                    metadata.value = JSON.stringify(metadata.value);
                                }
                                return metadata;
                            });
                        }
                        return [4 /*yield*/, graphqlapi_1.searchNodes(this.graphqlClient, this.tokenProvider, {
                                orgId: orgId,
                                name: name,
                                metadata: metadata
                            })];
                    case 1:
                        res = _c.sent();
                        return [2 /*return*/, res.searchOrgNodes];
                }
            });
        });
    };
    /**
     * @description 通过一个 JSON 导入树机构
     *
     */
    OrgManagementClient.prototype["import"] = function (json) {
        return __awaiter(this, void 0, void 0, function () {
            var api, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/v2/api/org/import-by-json";
                        return [4 /*yield*/, axios_1["default"].post(api, json, {
                                headers: {
                                    'x-authing-userpool-id': this.options.userPoolId,
                                    'x-authing-sdk-version': version_1.SDK_VERSION,
                                    'x-authing-request-from': 'sdk'
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    OrgManagementClient.prototype.addMember = function (arg1, arg2, arg3, arg4) {
        return __awaiter(this, arguments, void 0, function () {
            var orgId, nodeCode, userId, isLeader, data, nodeId, userId, isLeader, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(arguments.length === 4)) return [3 /*break*/, 2];
                        orgId = arg1;
                        nodeCode = arg2;
                        userId = arg3;
                        isLeader = arg4 || false;
                        return [4 /*yield*/, graphqlapi_1.addMember(this.graphqlClientV2, this.tokenProvider, {
                                orgId: orgId,
                                nodeCode: nodeCode,
                                userIds: [userId],
                                isLeader: isLeader
                            })];
                    case 1:
                        data = (_a.sent()).addMember;
                        return [2 /*return*/, data.users];
                    case 2:
                        nodeId = arg1;
                        userId = arg2;
                        isLeader = arg3 || false;
                        return [4 /*yield*/, graphqlapi_1.addMember(this.graphqlClientV2, this.tokenProvider, {
                                nodeId: nodeId,
                                userIds: [userId],
                                isLeader: isLeader
                            })];
                    case 3:
                        data = (_a.sent()).addMember;
                        return [2 /*return*/, data.users];
                }
            });
        });
    };
    OrgManagementClient.prototype.addMembers = function (arg1, arg2, arg3, arg4) {
        return __awaiter(this, void 0, void 0, function () {
            var orgId, nodeCode, userIds, isLeader, res, nodeId, userIds, isLeader, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof arg2 === 'string')) return [3 /*break*/, 2];
                        orgId = arg1;
                        nodeCode = arg2;
                        userIds = arg3;
                        isLeader = arg4 || false;
                        return [4 /*yield*/, graphqlapi_1.addMember(this.graphqlClientV2, this.tokenProvider, {
                                orgId: orgId,
                                nodeCode: nodeCode,
                                userIds: userIds,
                                isLeader: isLeader
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.addMember.users];
                    case 2:
                        nodeId = arg1;
                        userIds = arg2;
                        isLeader = arg3 || false;
                        return [4 /*yield*/, graphqlapi_1.addMember(this.graphqlClientV2, this.tokenProvider, {
                                nodeId: nodeId,
                                userIds: userIds,
                                isLeader: isLeader
                            })];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, res.addMember.users];
                }
            });
        });
    };
    OrgManagementClient.prototype.getMembers = function (arg1, arg2, arg3) {
        return __awaiter(this, void 0, void 0, function () {
            var orgId, code, options, nodeByCode, id, options, nodeById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(arg3 || (arg2 && typeof arg2 === 'string'))) return [3 /*break*/, 2];
                        orgId = arg1;
                        code = arg2;
                        options = arg3 || {};
                        return [4 /*yield*/, graphqlapi_1.getMembersByCode(this.graphqlClientV2, this.tokenProvider, __assign({ orgId: orgId,
                                code: code }, options))];
                    case 1:
                        nodeByCode = (_a.sent()).nodeByCode;
                        return [2 /*return*/, nodeByCode.users];
                    case 2:
                        id = arg1;
                        options = arg2 || {};
                        return [4 /*yield*/, graphqlapi_1.getMembersById(this.graphqlClientV2, this.tokenProvider, __assign({ id: id }, options))];
                    case 3:
                        nodeById = (_a.sent()).nodeById;
                        return [2 /*return*/, nodeById.users];
                }
            });
        });
    };
    OrgManagementClient.prototype.removeMember = function (arg1, arg2, arg3) {
        return __awaiter(this, void 0, void 0, function () {
            var orgId, code, userId, data, nodeId, userId, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!arg3) return [3 /*break*/, 2];
                        orgId = arg1;
                        code = arg2;
                        userId = arg3;
                        return [4 /*yield*/, graphqlapi_1.removeMembers(this.graphqlClientV2, this.tokenProvider, {
                                orgId: orgId,
                                nodeCode: code,
                                userIds: [userId]
                            })];
                    case 1:
                        data = (_a.sent()).removeMember;
                        return [2 /*return*/, data.users];
                    case 2:
                        nodeId = arg1;
                        userId = arg2;
                        return [4 /*yield*/, graphqlapi_1.removeMembers(this.graphqlClientV2, this.tokenProvider, {
                                nodeId: nodeId,
                                userIds: [userId]
                            })];
                    case 3:
                        data = (_a.sent()).removeMember;
                        return [2 /*return*/, data.users];
                }
            });
        });
    };
    OrgManagementClient.prototype.removeMembers = function (arg1, arg2, arg3) {
        return __awaiter(this, void 0, void 0, function () {
            var orgId, code, userIds, data, nodeId, userIds, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!arg3) return [3 /*break*/, 2];
                        orgId = arg1;
                        code = arg2;
                        userIds = arg3;
                        return [4 /*yield*/, graphqlapi_1.removeMembers(this.graphqlClientV2, this.tokenProvider, {
                                orgId: orgId,
                                nodeCode: code,
                                userIds: userIds
                            })];
                    case 1:
                        data = (_a.sent()).removeMember;
                        return [2 /*return*/, data.users];
                    case 2:
                        nodeId = arg1;
                        userIds = arg2;
                        return [4 /*yield*/, graphqlapi_1.removeMembers(this.graphqlClientV2, this.tokenProvider, {
                                nodeId: nodeId,
                                userIds: userIds
                            })];
                    case 3:
                        data = (_a.sent()).removeMember;
                        return [2 /*return*/, data.users];
                }
            });
        });
    };
    return OrgManagementClient;
}());
exports.OrgManagementClient = OrgManagementClient;
