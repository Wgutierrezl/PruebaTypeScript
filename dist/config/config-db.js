"use strict";
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Usuario_1 = require("../models/entities/Usuario");
const Pedidos_1 = require("../models/entities/Pedidos");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: `${process.env.DB_HOST}`,
    port: Number(`${process.env.DB_PORT}`),
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`, // cambia si tu contraseña es otra
    database: `${process.env.DB_DATABASE}`, // o el nombre de tu BD
    synchronize: true, // ⚠️ solo para desarrollo
    logging: true,
    entities: [Usuario_1.Usuarios, Pedidos_1.Pedidos],
});
module.exports = AppDataSource;
//# sourceMappingURL=config-db.js.map