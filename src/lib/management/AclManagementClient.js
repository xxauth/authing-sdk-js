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
exports.AclManagementClient = void 0;
var graphqlapi_1 = require("../graphqlapi");
/**
 * @class AclManagementClient 管理权限、访问控制
 * @description Authing 基于 PBAC（Policy Based Access Control，基于策略的访问控制）构建权限模型，
 * 可以和 RBAC （Role Based Access Control，基于角色的访问控制）结合，实现非常灵活、精细化的权限控制。
 * 此模块将此模型抽象成了两个方法: allow, isAllowed。
 *
 * @example
 *
 * 请使用以下方式使用该模块，而不要直接初始化该模块：
 *
 * \`\`\`javascript
 * import { ManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.acl.allow // 允许某个用户对某个资源进行某个操作
 * managementClient.acl.isAllowed // 判断某个用户是否对某个资源有某个操作权限
 * \`\`\`
 *
 * @name AclManagementClient
 */
var AclManagementClient = /** @class */ (function () {
    function AclManagementClient(options, graphqlClient, tokenProvider) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @name allow
     * @name_zh 允许某个用户对某个资源进行某个操作
     *
     * @description 允许某个用户对某个资源进行某个操作
     *
     * @param {string} userId 用户 ID
     * @param {string} action 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
     * @param {string} resource 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 *, 如 `*`, `books:123`, `books:*`
     * @example
     * managementClient.acl.allow('USERID1', 'books:123', 'books:read')
     * managementClient.acl.isAllowed('USERID1', 'books:123', 'books:read') // true
     * managementClient.acl.isAllowed('USERID1', 'books:123', 'books:edit') // false
     *
     * @example
     * managementClient.acl.allow('USERID2', 'books:*', 'books:*')
     * managementClient.acl.isAllowed('USERID2', 'books:123', 'books:read') // true
     * managementClient.acl.isAllowed('USERID2', 'books:124', 'books:edit') // true
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AclManagementClient
     */
    AclManagementClient.prototype.allow = function (userId, resource, action) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.allow(this.graphqlClient, this.tokenProvider, {
                            resource: resource,
                            action: action,
                            userId: userId
                        })];
                    case 1:
                        data = (_a.sent()).allow;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name isAllowed
     * @name_zh 判断某个用户是否对某个资源有某个操作权限
     *
     * @description 判断某个用户是否对某个资源有某个操作权限
     *
     * @param {string} userId 用户ID
     * @param {string} action 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
     * @param {string} resource 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 *, 如 `*`, `books:123`, `books:*`
     * @example
     * managementClient.acl.isAllowed('USERID', 'books:*', 'books:edit')
     *
     * @returns {Promise<boolean>} 是否具备操作权限
     * @memberof AclManagementClient
     *
     */
    AclManagementClient.prototype.isAllowed = function (userId, resource, action) {
        return __awaiter(this, void 0, void 0, function () {
            var isActionAllowed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.isAllowed(this.graphqlClient, this.tokenProvider, {
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
    return AclManagementClient;
}());
exports.AclManagementClient = AclManagementClient;
