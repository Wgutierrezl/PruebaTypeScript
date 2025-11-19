import AppDataSource from "./config-db";
import express, {Application, application} from 'express';
import userRoutes from '../routes/user.routers';
import orderRoutes from '../routes/order.routers';
import dotenv from 'dotenv';
import { swaggerSetUp } from "./config-swagger";


dotenv.config();


const app: Application=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
// Inicializar la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    // Montar las rutas
    app.use("/users", userRoutes); // todas las rutas de usuarios comienzan con /users
    app.use("/orders", orderRoutes); // todas las rutas de pedidos comienzan con /orders

    swaggerSetUp(app)

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
  });

