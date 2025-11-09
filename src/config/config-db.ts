import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuarios } from "../models/entities/Usuario";
import { Pedidos } from "../models/entities/Pedidos";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "wgutierrez2005", // cambia si tu contraseña es otra
  database: "practica_node",  // o el nombre de tu BD
  synchronize: true,           // ⚠️ solo para desarrollo
  logging: true,
  entities: [Usuarios,Pedidos],
});

export = AppDataSource;
