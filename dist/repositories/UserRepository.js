"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Usuario_1 = require("../models/entities/Usuario");
const config_db_1 = __importDefault(require("../config/config-db"));
class UserRepository {
    constructor() {
        this.userRepo = config_db_1.default.getRepository(Usuario_1.Usuarios);
    }
    async getUserByEmail(email) {
        return await this.userRepo.findOneBy({ correo: email });
    }
    async addUser(user) {
        const newUser = this.userRepo.create(user);
        return await this.userRepo.save(newUser);
    }
    async getUserById(id) {
        return await this.userRepo.findOneBy({ id });
    }
    async getAllUsers() {
        return await this.userRepo.find();
    }
    async saveChanges() {
        await config_db_1.default.manager.transaction(async () => { });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map