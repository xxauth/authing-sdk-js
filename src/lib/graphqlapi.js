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
exports.udf = exports.removeUdf = exports.addUdf = exports.removeUdv = exports.setUdv = exports.udv = exports.addWhiteList = exports.removeWhiteList = exports.getWhiteList = exports.allow = exports.getUserRoles = exports.userBatch = exports.unbindPhone = exports.bindPhone = exports.updateEmail = exports.updatePhone = exports.updatePassword = exports.userPermissionList = exports.userExists = exports.addUserToGroup = exports.refreshToken = exports.getGroups = exports.removeMembers = exports.moveNode = exports.deleteNode = exports.updateNode = exports.addNode = exports.updateRole = exports.roleWithUsers = exports.role = exports.roles = exports.deleteUsers = exports.deleteUser = exports.createUser = exports.searchUser = exports.updateUser = exports.updateUserpool = exports.getGroupsOfUser = exports.users = exports.resetPassword = exports.sendEmail = exports.getMembersByCode = exports.getMembersById = exports.addMember = exports.revokeRole = exports.assignRole = exports.addUserToRBACGroup = exports.addRole = exports.addGroupMetadata = exports.sendVerifyEmail = exports.registerByPhoneCode = exports.registerByUsername = exports.loginByPhonePassword = exports.loginByPhoneCode = exports.loginByUsername = exports.loginByEmail = exports.registerByEmail = exports.checkPasswordStrength = exports.checkLoginStatus = exports.createRBACGroup = exports.groupUserList = exports.isDenied = exports.isUserInGroup = exports.userGroupList = exports.CreateOIDCApp = exports.oidcProviderByDomain = exports.GetOIDCAppList = exports.GetSAMLIdentityProviderList = exports.deleteOrg = exports.createOrg = exports.orgRootNode = exports.passwordLessForceLogin = exports.user = exports.interConnections = exports.createUserWithoutAuthentication = exports.createInterConnection = exports.register = exports.queryPermissionList = exports.getUserPoolDetail = exports.addCollaborator = exports.searchNodes = exports.orgs = exports.isRootNodeOfOrg = exports.org = exports.getChildrenNodes = exports.isDomainAvaliable = exports.isAllowed = void 0;
var graphql_v1_1 = require("../types/graphql.v1");
var graphql_v2_1 = require("../types/graphql.v2");
exports.isAllowed = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.IsActionAllowedDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.isDomainAvaliable = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.IsDomainAvaliableDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getChildrenNodes = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.ChildrenNodesDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.org = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.OrgDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.isRootNodeOfOrg = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.IsRootNodeOfOrgDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.orgs = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.OrgsDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.searchNodes = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.SearchOrgNodesDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addCollaborator = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.AddCollaboratorDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getUserPoolDetail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UserpoolDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.queryPermissionList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.QueryPermissionListDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.register = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.RegisterDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createInterConnection = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.CreateInterConnectionDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createUserWithoutAuthentication = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.CreateUserWithoutAuthenticationDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.interConnections = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.InterConnectionsDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.user = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UserDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.passwordLessForceLogin = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.PasswordLessForceLoginDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.orgRootNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.OrgRootNodeDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createOrg = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.CreateOrgDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.deleteOrg = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.DeleteOrgDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetSAMLIdentityProviderList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.GetSamlIdentityProviderListDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GetOIDCAppList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.GetOidcAppListDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.oidcProviderByDomain = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.QueryOidcAppInfoByDomainDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.CreateOIDCApp = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.CreateOidcAppDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.userGroupList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.UserGroupListDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.isUserInGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.IsUserInGroupDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.isDenied = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.IsActionDeniedDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.groupUserList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.RbacGroupDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createRBACGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.CreateRbacGroupDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.checkLoginStatus = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.CheckLoginStatusDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.checkPasswordStrength = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.CheckPasswordStrengthDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.registerByEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RegisterByEmailDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.loginByEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = graphql_v2_1.LoginByEmailDocument;
        token = tokenProvider.getAccessToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
exports.loginByUsername = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = graphql_v2_1.LoginByUsernameDocument;
        token = tokenProvider.getAccessToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
exports.loginByPhoneCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = graphql_v2_1.LoginByPhoneCodeDocument;
        token = tokenProvider.getAccessToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
exports.loginByPhonePassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = graphql_v2_1.LoginByPhonePasswordDocument;
        token = tokenProvider.getAccessToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
exports.registerByUsername = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = graphql_v2_1.RegisterByUsernameDocument;
        token = tokenProvider.getAccessToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
exports.registerByPhoneCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = graphql_v2_1.RegisterByPhoneCodeDocument;
        token = tokenProvider.getAccessToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
exports.sendVerifyEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.SendVerifyEmailDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.addGroupMetadata = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.AddGroupMetadataDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.addRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.CreateRoleDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addUserToRBACGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.AddUserToRbacGroupDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.assignRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.AssignRoleDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.revokeRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RevokeRoleDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addMember = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.AddMemberDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getMembersById = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.NodeByIdWithMembersDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getMembersByCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.NodeByCodeWithMembersDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.sendEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.SendEmailDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.resetPassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.ResetPasswordDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.users = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UsersDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.getGroupsOfUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.GroupsDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.updateUserpool = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UpdateUserpoolDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.updateUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UpdateUserDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.searchUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.SearchUserDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.createUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.CreateUserDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.deleteUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.DeleteUserDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.deleteUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.DeleteUsersDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.roles = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RolesDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.role = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RoleDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.roleWithUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RoleWithUsersDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.updateRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UpdateRoleDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.addNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.AddNodeDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.updateNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UpdateNodeDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.deleteNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.DeleteNodeDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.moveNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.MoveNodeDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.removeMembers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RemoveMemberDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.getGroups = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.GroupsDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.refreshToken = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RefreshTokenDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.addUserToGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.AddUserToGroupDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.userExists = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.UserExistDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.userPermissionList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v1_1.UserPermissionListDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.updatePassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UpdatePasswordDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.updatePhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UpdatePhoneDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.updateEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UpdateEmailDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.bindPhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.BindPhoneDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.unbindPhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UnbindPhoneDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.userBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UserBatchDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.getUserRoles = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.GetUserRolesDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.allow = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.AllowDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.getWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.WhitelistDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.removeWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RemoveWhitelistDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.addWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.AddWhitelistDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.udv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UdvDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.setUdv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.SetUdvDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.removeUdv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RemoveUdvDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.addUdf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.AddUdfDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.removeUdf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.RemoveUdfDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
exports.udf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = graphql_v2_1.UdfDocument;
                return [4 /*yield*/, tokenProvider.getAccessToken()];
            case 1:
                token = _a.sent();
                return [2 /*return*/, garpqhlClient.request({
                        query: query,
                        token: token,
                        variables: variables
                    })];
        }
    });
}); };
