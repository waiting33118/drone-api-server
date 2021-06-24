"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var helmet_1 = __importDefault(require("helmet"));
var fs_1 = require("fs");
var socket_io_1 = require("socket.io");
var routes_1 = __importDefault(require("./routes"));
var websocket_1 = __importDefault(require("./services/websocket"));
var database_1 = __importDefault(require("./services/database"));
var _a = process.env, _b = _a.HTTP_PORT, HTTP_PORT = _b === void 0 ? '3030' : _b, _c = _a.HTTPS_PORT, HTTPS_PORT = _c === void 0 ? '3031' : _c, NODE_ENV = _a.NODE_ENV, _d = _a.PRIVATE_KEY_PATH, PRIVATE_KEY_PATH = _d === void 0 ? '/private.key' : _d, _e = _a.CERTIFICATE_PATH, CERTIFICATE_PATH = _e === void 0 ? '/certificate.crt' : _e;
console.log("Private key path: " + PRIVATE_KEY_PATH + "\nCert file path: " + CERTIFICATE_PATH);
var options = {
    key: fs_1.readFileSync(PRIVATE_KEY_PATH),
    cert: fs_1.readFileSync(CERTIFICATE_PATH)
};
var app = express_1.default();
app.use(helmet_1.default());
app.use(cors_1.default({
    origin: NODE_ENV === 'production'
        ? 'https://aiotlab-drone-cloud.web.app'
        : 'http://localhost:8080',
    credentials: true,
    maxAge: 300
}));
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(routes_1.default);
var httpServer = http_1.default.createServer(app);
var httpsServer = https_1.default.createServer(options, app);
var server = NODE_ENV === 'production' ? httpsServer : httpServer;
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: NODE_ENV === 'production'
            ? 'https://aiotlab-drone-cloud.web.app'
            : 'http://localhost:8080'
    }
});
websocket_1.default();
database_1.default();
httpServer.listen(+HTTP_PORT, function () {
    return console.log("HTTP server is listening on port " + HTTP_PORT);
});
httpsServer.listen(+HTTPS_PORT, function () {
    return console.log("HTTPS server is listening on port " + HTTPS_PORT);
});
