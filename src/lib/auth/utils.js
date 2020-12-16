"use strict";
exports.__esModule = true;
exports.createCssClassStyleSheet = void 0;
exports.createCssClassStyleSheet = function (className, styleSheet) {
    var styleTag = document.createElement('style');
    var styleText = "\n    ." + className + " {\n      " + styleSheet + "\n    }\n  ";
    var textNode = document.createTextNode(styleText);
    styleTag.appendChild(textNode);
    document.head.appendChild(styleTag);
};
