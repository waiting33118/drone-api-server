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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var helpers_1 = require("../helpers");
var uuid_1 = require("uuid");
var NODE_ENV = process.env.NODE_ENV;
exports.default = {
    signup: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, checkPassword, droneId, userRepo, user, encryptPassword, newUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password, checkPassword = _a.checkPassword, droneId = _a.droneId;
                        if (email.trim() === '' ||
                            password.trim() === '' ||
                            checkPassword.trim() === '' ||
                            droneId.trim() === '') {
                            res.status(400).json({ msg: 'Required field is empty' });
                            return [2 /*return*/];
                        }
                        if (password !== checkPassword) {
                            res.status(400).json({ msg: 'Password & check password not match' });
                            return [2 /*return*/];
                        }
                        if (password.length < 8) {
                            res
                                .status(400)
                                .json({ msg: 'Password must equal or longer than 8 character' });
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        userRepo = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepo.findOne({ where: { email: email } })];
                    case 2:
                        user = _b.sent();
                        if (user) {
                            res.status(400).json({ msg: 'Email exist' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, helpers_1.encryptPlaintext(password)];
                    case 3:
                        encryptPassword = _b.sent();
                        newUser = userRepo.create({
                            email: email,
                            password: encryptPassword,
                            droneId: droneId,
                            uuid: uuid_1.v4()
                        });
                        return [4 /*yield*/, userRepo.save(newUser)];
                    case 4:
                        _b.sent();
                        res.status(201).json({ msg: 'User created' });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(500).json({ msg: 'Internal server error' });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    login: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, userRepo, user, accessToken, refreshToken, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        if (email.trim() === '' || password.trim() === '') {
                            res.status(400).json({ msg: 'Required field is empty' });
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        userRepo = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepo.findOne({ where: { email: email } })];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            res.status(401).json({ msg: 'Account not found' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, helpers_1.compareEncryption(password, user.password)];
                    case 3:
                        if (!(_b.sent())) {
                            res.status(401).json({ msg: 'Invalid password ' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, helpers_1.signJwtToken('5m', { uuid: user.uuid })];
                    case 4:
                        accessToken = _b.sent();
                        return [4 /*yield*/, helpers_1.signJwtToken('30d', { uuid: user.uuid })];
                    case 5:
                        refreshToken = _b.sent();
                        res
                            .cookie('access_token', accessToken, {
                            httpOnly: true,
                            maxAge: 1000 * 60 * 5,
                            secure: true,
                            sameSite: 'none'
                        })
                            .cookie('refresh_token', refreshToken, {
                            httpOnly: true,
                            maxAge: 1000 * 60 * 60 * 24 * 30,
                            secure: true,
                            sameSite: 'none'
                        })
                            .json({ msg: 'User login' });
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        console.log(error_2);
                        res.status(500).json({ msg: 'Internal server error' });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    refreshToken: function (req, res) {
        res
            .cookie('access_token', res.locals.accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 5,
            secure: true,
            sameSite: 'none'
        })
            .send('refreshed');
    },
    logout: function (req, res) {
        res
            .clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
            .clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
            .send('logout');
    }
};
