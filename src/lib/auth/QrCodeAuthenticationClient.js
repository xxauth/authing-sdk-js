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
exports.QrCodeAuthenticationClient = void 0;
var utils_1 = require("./utils");
var QrCodeAuthenticationClient = /** @class */ (function () {
    function QrCodeAuthenticationClient(options, tokenProvider, httpClient, scene) {
        this.options = options;
        this.tokenProvider = tokenProvider;
        this.httpClient = httpClient;
        this.scene = scene;
    }
    /**
     * @description 生成二维码
     *
     */
    QrCodeAuthenticationClient.prototype.geneCode = function (customData) {
        if (customData === void 0) { customData = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/v2/api/qrcode/gene";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: {
                                    scene: this.scene,
                                    customData: customData
                                }
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 检查二维码状态
     *
     */
    QrCodeAuthenticationClient.prototype.checkStatus = function (random) {
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/v2/api/qrcode/check?random=" + random;
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: api
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    QrCodeAuthenticationClient.prototype.exchangeUserInfo = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var api, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/v2/api/qrcode/userinfo";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: {
                                    ticket: ticket
                                }
                            })];
                    case 1:
                        userInfo = _a.sent();
                        return [2 /*return*/, userInfo];
                }
            });
        });
    };
    /**
     * @description 开始轮询二维码状态
     *
     */
    QrCodeAuthenticationClient.prototype.startPolling = function (random, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, interval, onStart, onResult, onScanned, onExpired, onSuccess, onCancel, onError, calledOnScanned, callOnPoolingStart, timer;
            var _this = this;
            return __generator(this, function (_b) {
                options = options || {};
                _a = options.interval, interval = _a === void 0 ? 800 : _a, onStart = options.onStart, onResult = options.onResult, onScanned = options.onScanned, onExpired = options.onExpired, onSuccess = options.onSuccess, onCancel = options.onCancel, onError = options.onError;
                calledOnScanned = false;
                callOnPoolingStart = false;
                timer = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    var data, status_1, ticket, userInfo, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // 开始轮询时回调 onPollingStart
                                if (onStart && !callOnPoolingStart) {
                                    onStart(timer);
                                    callOnPoolingStart = true;
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, this.checkStatus(random)];
                            case 2:
                                data = _a.sent();
                                status_1 = data.status, ticket = data.ticket, userInfo = data.userInfo;
                                // 每次获取到数据都回调 onResult 函数
                                if (onResult) {
                                    onResult(data);
                                }
                                // 过期
                                if (status_1 === -1) {
                                    clearInterval(timer);
                                    if (onExpired) {
                                        onExpired();
                                    }
                                }
                                // 未扫码
                                if (status_1 === 0) {
                                }
                                // 已扫码
                                if (status_1 === 1) {
                                    if (onScanned && !calledOnScanned) {
                                        onScanned(userInfo);
                                        calledOnScanned = true;
                                    }
                                }
                                // 已授权
                                if (status_1 === 2) {
                                    clearInterval(timer);
                                    if (onSuccess) {
                                        onSuccess(userInfo, ticket);
                                    }
                                }
                                // 已取消
                                if (status_1 === 3) {
                                    clearInterval(timer);
                                    if (onCancel) {
                                        onCancel();
                                    }
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _a.sent();
                                if (onError) {
                                    onError(error_1);
                                }
                                return [2 /*return*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, interval);
                return [2 /*return*/, timer];
            });
        });
    };
    QrCodeAuthenticationClient.prototype.startScanning = function (domId, options) {
        return __awaiter(this, void 0, void 0, function () {
            function genRetry(qrcodeElm, tipText, retryId) {
                var tip = genTip(tipText);
                nodeWrapper = document.createElement('div');
                nodeWrapper.id = 'authing__qrcode-wrapper';
                nodeWrapper.style.textAlign = 'center';
                nodeWrapper.style.position = 'relative';
                // TODO: 这里换一个二维码
                var qrcodeImage = genImage('https://usercontents.authing.cn/0ab3a1bf19c0d7106673e494d532f91a.png');
                if (!needGenerate) {
                    qrcodeImage.style.marginTop = '12px';
                }
                else {
                    qrcodeImage.style.marginTop = '16px';
                }
                qrcodeImage.onload = function () {
                    unloading();
                };
                var shadow = genShadow(retry, function () {
                    start();
                }, retryId || '__authing_retry_btn');
                nodeWrapper.appendChild(qrcodeImage);
                nodeWrapper.appendChild(shadow);
                nodeWrapper.appendChild(tip);
                qrcodeElm.appendChild(nodeWrapper);
            }
            var _a, size, _b, containerSize, _c, interval, onStart, onResult, onScanned, onExpired, onSuccess, onCancel, onError, onCodeShow, onCodeLoaded, onCodeLoadFailed, _d, 
            // onCodeDestroyed,
            tips, _e, title, _f, 
            // scanned = '用户已扫码，等待确认',
            canceled, _g, expired, _h, succeed, _j, retry, node, nodeWrapper, needGenerate, styleNode, style, loading, unloading, genTip, genImage, genShadow, displayScannedUser, start;
            var _this = this;
            return __generator(this, function (_k) {
                options = options || {};
                _a = options.size, size = _a === void 0 ? {
                    height: 240,
                    width: 240
                } : _a, _b = options.containerSize, containerSize = _b === void 0 ? {
                    height: 300,
                    width: 300
                } : _b, _c = options.interval, interval = _c === void 0 ? 800 : _c, onStart = options.onStart, onResult = options.onResult, onScanned = options.onScanned, onExpired = options.onExpired, onSuccess = options.onSuccess, onCancel = options.onCancel, onError = options.onError, onCodeShow = options.onCodeShow, onCodeLoaded = options.onCodeLoaded, onCodeLoadFailed = options.onCodeLoadFailed, _d = options.tips, tips = _d === void 0 ? {} : _d;
                _e = tips.title, title = _e === void 0 ? "\u4F7F\u7528 <strong> " + (this.scene === 'WXAPP_AUTH' ? '微信' : 'APP') + " </strong> \u626B\u7801\u767B\u5F55" : _e, _f = tips.canceled, canceled = _f === void 0 ? '用户取消授权' : _f, _g = tips.expired, expired = _g === void 0 ? '二维码已过期' : _g, _h = tips.succeed, succeed = _h === void 0 ? '扫码成功' : _h, _j = tips.retry, retry = _j === void 0 ? '重试' : _j;
                node = document.getElementById(domId);
                needGenerate = false;
                if (!node) {
                    node = document.createElement('div');
                    node.id = domId;
                    utils_1.createCssClassStyleSheet('__authing-qrcode-node-mount', "z-index: 65535;position: fixed;background: #fff;width: " + containerSize.width + "px;height: " + containerSize.height + "px;left: 50%;margin-left: -" + containerSize.width /
                        2 + "px;display: flex;justify-content: center;align-items: center;top: 50%;margin-top: -" + containerSize.height /
                        2 + "px;border: 1px solid #ccc;");
                    node.classList.add('__authing-qrcode-node-mount');
                    document.getElementsByTagName('body')[0].appendChild(node);
                    needGenerate = true;
                }
                else {
                    node.style.position = 'relative';
                }
                styleNode = document.createElement('style');
                style = '#authing__retry a:hover{outline:0px;text-decoration:none;}#authing__spinner{position:absolute;left:50%;margin-left:-6px;}.spinner{margin:100px auto;width:20px;height:20px;position:relative}.container1>div,.container2>div,.container3>div{width:6px;height:6px;background-color:#00a1ea;border-radius:100%;position:absolute;-webkit-animation:bouncedelay 1.2s infinite ease-in-out;animation:bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.spinner .spinner-container{position:absolute;width:100%;height:100%}.container2{-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}.container3{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}.circle1{top:0;left:0}.circle2{top:0;right:0}.circle3{right:0;bottom:0}.circle4{left:0;bottom:0}.container2 .circle1{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.container3 .circle1{-webkit-animation-delay:-1.0s;animation-delay:-1.0s}.container1 .circle2{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.container2 .circle2{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.container3 .circle2{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.container1 .circle3{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.container2 .circle3{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.container3 .circle3{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.container1 .circle4{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.container2 .circle4{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.container3 .circle4{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}@-webkit-keyframes bouncedelay{0%,80%,100%{-webkit-transform:scale(0.0)}40%{-webkit-transform:scale(1.0)}}@keyframes bouncedelay{0%,80%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}40%{transform:scale(1.0);-webkit-transform:scale(1.0)}}';
                styleNode.type = 'text/css';
                if (styleNode.style) {
                    styleNode.style.cssText = style;
                }
                else {
                    styleNode.innerHTML = style;
                }
                document.getElementsByTagName('head')[0].appendChild(styleNode);
                loading = function () {
                    node.innerHTML =
                        '<div id="authing__spinner" class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
                };
                unloading = function () {
                    var child = document.getElementById('authing__spinner');
                    if (child)
                        node.removeChild(child);
                };
                genTip = function (text) {
                    var tip = document.createElement('span');
                    tip.className = 'authing__heading-subtitle';
                    if (!needGenerate) {
                        utils_1.createCssClassStyleSheet('__authing__heading-subtitle-style', 'display: block;font-weight: 400;font-size: 15px;color: #888;line-height: 48px;');
                        tip.classList.add('__authing__heading-subtitle-style');
                    }
                    else {
                        utils_1.createCssClassStyleSheet('__authing__heading-subtitle-style', 'display: block;font-weight: 400;font-size: 12px;color: #888;');
                        tip.classList.add('__authing__heading-subtitle-style');
                    }
                    tip.innerHTML = text;
                    return tip;
                };
                genImage = function (src) {
                    var qrcodeImage = document.createElement('img');
                    qrcodeImage.className = 'authing__qrcode';
                    qrcodeImage.src = src;
                    qrcodeImage.width = size.width;
                    qrcodeImage.height = size.height;
                    return qrcodeImage;
                };
                genShadow = function (text, aOnClick, shadowAId) {
                    var shadowId = 'authing__retry';
                    if (document.getElementById(shadowId)) {
                        document.getElementById(shadowId).remove();
                    }
                    var shadow = document.createElement('div');
                    shadow.id = shadowId;
                    utils_1.createCssClassStyleSheet('__authing-shadow-style', "text-align:center;width: " + size.width + "px;height: " + size.height + "px;position: absolute;left: 50%;top: 0px;margin-left: -" + size.width /
                        2 + "px;background-color: rgba(0,0,0, 0.5);line-height:" + size.height + "px;color:#fff;font-weight:600;");
                    shadow.classList.add('__authing-shadow-style');
                    var shadowA = document.createElement('a');
                    shadowA.innerHTML = text;
                    shadowA.style.color = '#fff';
                    shadowA.style.borderBottom = '1px solid #fff';
                    shadowA.style.cursor = 'pointer';
                    shadowA.onclick = aOnClick;
                    shadowA.id = shadowAId;
                    shadow.appendChild(shadowA);
                    return shadow;
                };
                displayScannedUser = function (_, photo) {
                    var shadowId = 'authing__retry';
                    if (document.getElementById(shadowId)) {
                        document.getElementById(shadowId).remove();
                    }
                    var shadow = document.createElement('div');
                    utils_1.createCssClassStyleSheet('__authing-shadow-style-position', "text-align:center;width: " + size.width + "px;height: " + size.height + "px;position: absolute;left: 50%;top: 0px;margin-left: -" + size.width /
                        2 + "px;line-height:" + size.height + "px;color:#fff;font-weight:600;display: flex;\n      align-items: center; /*\u5782\u76F4\u5C45\u4E2D*/\n      justify-content: center; /*\u6C34\u5E73\u5C45\u4E2D*/");
                    shadow.classList.add('__authing-shadow-style-position');
                    shadow.id = shadowId;
                    var img = document.createElement('img');
                    img.id = 'authing__scanned-user';
                    img.src = photo;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    shadow.appendChild(img);
                    return shadow;
                };
                start = function () { return __awaiter(_this, void 0, void 0, function () {
                    var random, url, data, error_2, qrcodeImage;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                loading();
                                random = null;
                                url = null;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, this.geneCode()];
                            case 2:
                                data = _a.sent();
                                random = data.random;
                                url = data.url;
                                return [3 /*break*/, 4];
                            case 3:
                                error_2 = _a.sent();
                                error_2 = error_2;
                                genRetry(node, error_2.message);
                                if (onCodeLoadFailed) {
                                    onCodeLoadFailed(error_2);
                                }
                                return [2 /*return*/];
                            case 4:
                                if (onCodeLoaded) {
                                    onCodeLoaded(random, url);
                                }
                                nodeWrapper = document.createElement('div');
                                nodeWrapper.id = 'authing__qrcode-wrapper';
                                nodeWrapper.style.textAlign = 'center';
                                nodeWrapper.style.position = 'relative';
                                qrcodeImage = genImage(url);
                                qrcodeImage.onload = function () {
                                    unloading();
                                    if (onCodeShow) {
                                        onCodeShow(random, url);
                                    }
                                    // 需要对用户的 onSuccess, onScanned, onExpired, onCancel 进行加工从而在页面上展示相关提示
                                    var decoratedOnSuccess = function (userInfo, ticket) {
                                        var shadow = genShadow(succeed, null, '__authing_success_tip');
                                        nodeWrapper.appendChild(shadow);
                                        if (onSuccess) {
                                            onSuccess(userInfo, ticket);
                                        }
                                    };
                                    var decoratedOnScanned = function (userInfo) {
                                        var shadow = displayScannedUser(userInfo.nickname, userInfo.photo);
                                        nodeWrapper.appendChild(shadow);
                                        if (onScanned) {
                                            onScanned(userInfo);
                                        }
                                    };
                                    var decoratedOnCancel = function () {
                                        var shadow = genShadow(canceled, null, '__authing_success_tip');
                                        nodeWrapper.appendChild(shadow);
                                        if (onCancel) {
                                            onCancel();
                                        }
                                    };
                                    var decoratedOnExpired = function () {
                                        var shadow = genShadow(expired, null, '__authing_success_tip');
                                        nodeWrapper.appendChild(shadow);
                                        if (onExpired) {
                                            onExpired();
                                        }
                                    };
                                    var decoratedOnError = function (data) {
                                        var message = data.message;
                                        if (onError) {
                                            onError(message);
                                        }
                                    };
                                    // 开始轮询
                                    _this.startPolling(random, {
                                        interval: interval,
                                        onStart: onStart,
                                        onResult: onResult,
                                        onScanned: decoratedOnScanned,
                                        onExpired: decoratedOnExpired,
                                        onSuccess: decoratedOnSuccess,
                                        onCancel: decoratedOnCancel,
                                        onError: decoratedOnError
                                    });
                                    var tip = genTip(title);
                                    nodeWrapper.appendChild(qrcodeImage);
                                    nodeWrapper.appendChild(tip);
                                    node.appendChild(nodeWrapper);
                                };
                                return [2 /*return*/];
                        }
                    });
                }); };
                start();
                return [2 /*return*/];
            });
        });
    };
    return QrCodeAuthenticationClient;
}());
exports.QrCodeAuthenticationClient = QrCodeAuthenticationClient;
