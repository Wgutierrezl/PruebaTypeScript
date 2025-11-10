"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// allowedRoles: lista de roles permitidos
const authMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                return res.status(500).json({ message: "JWT_SECRET is not configured" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            req.user = decoded;
            if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        }
        catch (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
    };
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=genericMiddleware.js.map