"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./models/Usuario");
const Pedido_1 = require("./models/Pedido");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "wgutierrez2005", // cambia si tu contraseña es otra
    database: "practica_node", // o el nombre de tu BD
    synchronize: true, // ⚠️ solo para desarrollo
    logging: true,
    entities: [Usuario_1.Usuario, Pedido_1.Pedido],
});
//# sourceMappingURL=config-db.js.map