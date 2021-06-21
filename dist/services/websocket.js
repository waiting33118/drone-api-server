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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("../server");
var amqplib_1 = __importDefault(require("amqplib"));
var _a = process.env, RABBITMQ_HOSTNAME = _a.RABBITMQ_HOSTNAME, RABBITMQ_USERNAME = _a.RABBITMQ_USERNAME, RABBITMQ_PASSWORD = _a.RABBITMQ_PASSWORD, _b = _a.RABBITMQ_PORT, RABBITMQ_PORT = _b === void 0 ? '5672' : _b;
exports.default = (function () {
    server_1.io.on('connection', function (socket) {
        console.log('Websocket connected:', socket.id);
        var connection;
        var channel;
        var droneId;
        socket.on('create-rabbitmq-connection', function (receiveId) { return __awaiter(void 0, void 0, void 0, function () {
            function bindTopicQueue(topicName) {
                return __awaiter(this, void 0, void 0, function () {
                    var queue;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, channel.assertQueue('', { exclusive: true })];
                            case 1:
                                queue = _a.sent();
                                return [4 /*yield*/, channel.bindQueue(queue.queue, 'drone', droneId + ".phone." + topicName)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, channel.consume(queue.queue, function (msg) {
                                        if (msg) {
                                            socket.emit(topicName + "-topic", JSON.parse(msg.content.toString()));
                                        }
                                    }, { noAck: true })];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        droneId = receiveId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, amqplib_1.default.connect({
                                protocol: 'amqp',
                                hostname: RABBITMQ_HOSTNAME,
                                port: +RABBITMQ_PORT,
                                username: RABBITMQ_USERNAME,
                                password: RABBITMQ_PASSWORD
                            })];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.createChannel()];
                    case 3:
                        channel = _a.sent();
                        return [4 /*yield*/, channel.assertExchange('drone', 'topic', { durable: false })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, bindTopicQueue('drone')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bindTopicQueue('webrtc')];
                    case 6:
                        _a.sent();
                        socket.emit('rabbitmq-queue-isReady');
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        socket.on('send-drone', function (command) {
            channel.publish('drone', droneId + ".web.drone", Buffer.from(JSON.stringify(command)));
        });
        socket.on('send-webrtc', function (data) {
            channel.publish('drone', droneId + ".web.webrtc", Buffer.from(JSON.stringify(data)));
        });
        socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Websocket disconnected:', socket.id);
                        if (!connection) return [3 /*break*/, 2];
                        return [4 /*yield*/, connection.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    });
});
