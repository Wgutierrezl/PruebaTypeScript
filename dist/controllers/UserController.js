"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const UserRepository_1 = require("../repositories/UserRepository");
const TokenService_1 = require("../custom/Security/TokenService");
const HasherService_1 = require("../custom/Security/HasherService");
class UserController {
    constructor() {
        // Registro de usuario
        this.register = async (req, res) => {
            try {
                const dto = req.body;
                const user = await this._service.newUser(dto);
                return res.status(201).json(user);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al registrar el usuario" });
            }
        };
        // Login
        this.login = async (req, res) => {
            try {
                const dto = req.body;
                const session = await this._service.loginUser(dto);
                if (session == null) {
                    return res.status(401).json({ message: "Credenciales inválidas" });
                }
                return res.status(200).json(session);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al iniciar sesión" });
            }
        };
        // Obtener todos los usuarios
        this.getAll = async (req, res) => {
            try {
                const users = await this._service.GetAllUsers();
                if (!users) {
                    return res.status(404).json({ message: "No hay usuarios" });
                }
                return res.status(200).json(users);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener usuarios" });
            }
        };
        //ObtenerSoloUnUsuario
        this.getById = async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: "El ID es requerido" });
                }
                const user = await this._service.GetUserById(id);
                if (user == null) {
                    return res.status(404).json({ message: "user not found" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener el usuario" });
            }
        };
        this.getProfile = async (req, res) => {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: 'Access denied' });
                }
                const user = await this._service.GetUserById(req.user.id);
                if (user == null) {
                    return res.status(404).json({ message: 'user not found' });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al obtener el usuario" });
            }
        };
        // ✅ Inicializamos las clases concretas
        const userRepo = new UserRepository_1.UserRepository(); // implementación concreta del repositorio
        const tokenService = new TokenService_1.TokenService(); // implementación concreta del token
        const hasher = new HasherService_1.HasherService(); // implementación concreta del hasher
        // ✅ Pasamos las implementaciones al servicio que recibe interfaces
        this._service = new UserService_1.UserService(userRepo, tokenService, hasher);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map