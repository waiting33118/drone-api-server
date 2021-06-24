"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("../../middlewares");
var auth_1 = __importDefault(require("../../services/auth"));
var user_1 = __importDefault(require("../../services/user"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    return res.json({ server: 'Running' });
});
router.post('/auth/signup', auth_1.default.signup);
router.post('/auth/login', auth_1.default.login);
router.get('/auth/token', middlewares_1.verifyTokens, auth_1.default.refreshToken);
router.post('/auth/logout', auth_1.default.logout);
router.get('/user/me', middlewares_1.verifyTokens, user_1.default.getUserInfo);
exports.default = router;
