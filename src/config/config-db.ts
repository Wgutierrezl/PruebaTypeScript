import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuarios } from "../models/entities/Usuario";
import { Pedidos } from "../models/entities/Pedidos";

const AppDataSource = new DataSource({
  type: "mysql",
  host: `${process.env.DB_HOST}`,
  port: Number(`${process.env.DB_PORT}`),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`, // cambia si tu contraseña es otra
  database: `${process.env.DB_DATABASE}`,  // o el nombre de tu BD
  synchronize: true,           // ⚠️ solo para desarrollo
  logging: true,
  entities: [Usuarios,Pedidos],
});

export = AppDataSource;
