"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const genericMiddleware_1 = require("../middleware/genericMiddleware");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones de usuarios
 */
/**
 * @swagger
 * /users/registerUser:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Marino
 *               correo:
 *                 type: string
 *                 example: marino@gmail.com
 *               contrasena:
 *                 type: string
 *                 example: 123456
 *               rol:
 *                 type: string
 *                 example: Admin
 *     responses:
 *       201:
 *         description: Usuario creado
 *       500:
 *         description: Error al registrar usuario
 */
router.post('/registerUser', userController.register);
/**
 * @swagger
 * /users/loginUser:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso con token
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post('/loginUser', userController.login);
/**
 * @swagger
 * /users/getAllUser:
 *   get:
 *     summary: Obtener todos los usuarios (solo Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       403:
 *         description: Rol no autorizado
 *       500:
 *         description: Error al obtener usuarios
 */
router.get('/getAllUser', (0, genericMiddleware_1.authMiddleware)(['Admin']), userController.getAll);
/**
 * @swagger
 * /users/getOnlyOneUser/{id}:
 *   get:
 *     summary: Obtener un usuario por ID (solo Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Rol no autorizado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get('/getOnlyOneUser/:id', (0, genericMiddleware_1.authMiddleware)(['Admin']), userController.getById);
/**
 * @swagger
 * /users/getProfile:
 *   get:
 *     summary: Obtener un perfil del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Rol no autorizado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get('/getProfile', (0, genericMiddleware_1.authMiddleware)(['Admin', 'Usuario']), userController.getProfile);
exports.default = router;
//# sourceMappingURL=user.routers.js.map