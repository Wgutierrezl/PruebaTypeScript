"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    generateToken(user) {
        const payload = {
            id: user.id,
            email: user.correo,
            name: user.nombre,
            role: user.rol ?? 'Default'
        };
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN ?? "1h";
        const token = jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: expiresIn
        });
        return token;
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=TokenService.js.map