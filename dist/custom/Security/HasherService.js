"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasherService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class HasherService {
    comparePassword(password, hashed) {
        return bcrypt_1.default.compareSync(password, hashed);
    }
    encryptPassword(password) {
        const saltRounds = 10;
        const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
        return hashedPassword;
    }
}
exports.HasherService = HasherService;
//# sourceMappingURL=HasherService.js.map