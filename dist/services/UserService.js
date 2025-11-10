"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Usuario_1 = require("../models/entities/Usuario");
const SessionDTO_1 = require("../models/DTOs/SessionDTO");
class UserService {
    /**
     *
     */
    constructor(repo, tokenService, hasher) {
        this._repo = repo;
        this._tokenService = tokenService;
        this._hasher = hasher;
    }
    async newUser(user) {
        try {
            const usuarios = new Usuario_1.Usuarios();
            const password = this._hasher.encryptPassword(user.contrasena);
            usuarios.nombre = user.nombre;
            usuarios.correo = user.correo;
            usuarios.contrasena = password;
            usuarios.rol = user.rol ?? 'default';
            const userCreated = await this._repo.addUser(usuarios);
            return userCreated;
        }
        catch (error) {
            console.error("Error al crear usuario:", error);
            throw new Error("Error al registrar el usuario");
        }
    }
    async GetUserById(id) {
        try {
            const user = await this._repo.getUserById(id);
            console.log("Nombre del usuario" + user?.nombre);
            if (user == null) {
                return null;
            }
            return user;
        }
        catch (error) {
            console.error("Error al obtener al usuario usuario:", error);
            throw new Error("Error al obtener el usuario");
        }
    }
    async GetAllUsers() {
        try {
            const users = await this._repo.getAllUsers();
            if (users == null || users.length == 0) {
                return null;
            }
            return users;
        }
        catch (error) {
            console.error("Error al obtener los usuarios:", error);
            throw new Error("Error al obtener los usuarios");
        }
    }
    async loginUser(log) {
        try {
            console.log("📥 Datos recibidos:", log);
            const userEmail = await this._repo.getUserByEmail(log.email);
            console.log("🔍 Usuario encontrado:", userEmail);
            if (userEmail == null) {
                console.log("⚠️ Usuario no encontrado en la base de datos");
                return null;
            }
            // 🔥 usar comparePassword en lugar de cifrar de nuevo
            const isMatch = this._hasher.comparePassword(log.password, userEmail.contrasena);
            if (!isMatch) {
                console.log("❌ Contraseña incorrecta");
                return null;
            }
            const token = this._tokenService.generateToken(userEmail);
            const sessionDTO = new SessionDTO_1.SessionDTO();
            sessionDTO.token = token;
            sessionDTO.userId = userEmail.id;
            console.log("✅ Login exitoso, token generado:", token);
            return sessionDTO;
        }
        catch (error) {
            console.error("💥 Error al loguear al usuario:", error);
            throw new Error("Error al loguear al usuario");
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map