"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importStar(require("express"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = require("path");
function default_1(_rootDirectory, options) {
    var app = (0, express_1.Router)();
    var _a = options.serve, serve = _a === void 0 ? true : _a, _b = options.path, path = _b === void 0 ? "/app" : _b;
    if (serve) {
        var dashboardPath = (0, path_1.resolve)(__dirname, "../build");
        var htmlPath = (0, path_1.resolve)(dashboardPath, "index.html");
        var html_1 = fs_extra_1["default"].readFileSync(htmlPath, "utf-8");
        var sendHtml = function (_req, res) {
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Vary", "Origin, Cache-Control");
            res.send(html_1);
        };
        var setStaticHeaders = function (res) {
            res.setHeader("Cache-Control", "max-age=31536000, immutable");
            res.setHeader("Vary", "Origin, Cache-Control");
        };
        app.get(path, sendHtml);
        app.use(path, express_1["default"].static(dashboardPath, {
            setHeaders: setStaticHeaders
        }));
        app.get("".concat(path, "/*"), sendHtml);
    }
    else {
        app.get(path, function (_req, res) {
            res.send("Admin not enabled");
        });
    }
    return app;
}
exports["default"] = default_1;
