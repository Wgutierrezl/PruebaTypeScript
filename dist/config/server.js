"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_db_1 = __importDefault(require("./config-db"));
const express_1 = __importDefault(require("express"));
const user_routers_1 = __importDefault(require("../routes/user.routers"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_swagger_1 = require("./config-swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Inicializar la base de datos
config_db_1.default.initialize()
    .then(() => {
    console.log("✅ Conexión a la base de datos establecida correctamente.");
    // Montar las rutas
    app.use("/users", user_routers_1.default); // todas las rutas de usuarios comienzan con /users
    (0, config_swagger_1.swaggerSetUp)(app);
    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
});
//# sourceMappingURL=server.js.map