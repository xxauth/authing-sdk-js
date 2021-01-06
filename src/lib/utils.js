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
exports.serialize = exports.createCssClassStyleSheet = exports.popupCenter = exports.deepEqual = exports.encrypt = void 0;
exports.encrypt = function (plainText, publicKey) { return __awaiter(void 0, void 0, void 0, function () {
    var crypto, pawBuffer, encryptText;
    return __generator(this, function (_a) {
        crypto = require('crypto');
        pawBuffer = Buffer.from(plainText);
        encryptText = crypto
            .publicEncrypt({
            key: Buffer.from(publicKey),
            padding: 1
            // padding: crypto.constants.RSA_PKCS1_PADDING
        }, pawBuffer)
            .toString('base64');
        return [2 /*return*/, encryptText];
    });
}); };
function buildTree(nodes) {
    /* nodes structure
    [
      {"id": "1", "children": ["2"], "root": true},
      {"id": "2", "children": ["3", "4"], "root": false},
      {"id": "3", "children": [], "root": false},
      {"id": "4", "children": [], "root": false},
    ]
  
    转换成 ->
    {
      id: 1,
      children: [
        {
          id: 2,
          children: [
            {
              id: 3,
              children: []
            },
            {
              id: 4,
              children: []
            }
          ]
        }
      ]
    }
    */
    var rootNodes = [nodes.find(function (x) { return x.root === true; })];
    var mapChildren = function (childId) {
        var node = nodes.find(function (x) { return x.id === childId; }) || null;
        if (Array.isArray(node.children) && node.children.length > 0) {
            node.children = node.children
                .map(mapChildren)
                .filter(function (node) { return node !== null; });
        }
        return node;
    };
    var tree = rootNodes.map(function (node) {
        node.children = node.children
            .map(mapChildren)
            .filter(function (node) { return node !== null; });
        return node;
    });
    return tree[0];
}
exports["default"] = buildTree;
exports.deepEqual = function (x, y) {
    if (x === y) {
        return true;
    }
    else if (typeof x == 'object' &&
        x != null &&
        typeof y == 'object' &&
        y != null) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false;
        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!exports.deepEqual(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }
        return true;
    }
    else
        return false;
};
exports.popupCenter = function (url, _a) {
    var _b = _a === void 0 ? { w: 585, h: 649 } : _a, w = _b.w, h = _b.h;
    // Fixes dual-screen position                             Most browsers      Firefox
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    var width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : window.screen.width;
    var height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : window.screen.height;
    var systemZoom = width / window.screen.availWidth;
    var left = (width - w) / 2 / systemZoom + dualScreenLeft;
    var top = (height - h) / 2 / systemZoom + dualScreenTop;
    var newWindow = window.open(url, '_blank', "\n      toolbar=no,\n      menubar=no,\n      scrollbars=no,\n      resizable=no,\n      location=no,\n      status=no\n      width=" + w / systemZoom + ",\n      height=" + h / systemZoom + ",\n      top=" + top + ",\n      left=" + left + "\n      ");
    newWindow === null || newWindow === void 0 ? void 0 : newWindow.focus();
};
exports.createCssClassStyleSheet = function (className, styleSheet) {
    var styleTag = document.createElement('style');
    var styleText = "\n    ." + className + " {\n      " + styleSheet + "\n    }\n  ";
    var textNode = document.createTextNode(styleText);
    styleTag.appendChild(textNode);
    document.head.appendChild(styleTag);
};
exports.serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    return str.join('&');
};
