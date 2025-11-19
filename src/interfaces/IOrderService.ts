import { PedidoDTO } from "../models/DTOs/PedidoDTO";
import { Pedidos } from "../models/entities/Pedidos";

export interface IOrderService {
    createOrder(orderData: PedidoDTO): Promise<Pedidos>;
    getOrderById(id: string): Promise<Pedidos | null>;
    getOrdersByUserId(userId: string): Promise<Pedidos[]>;
    getAllOrders(): Promise<Pedidos[]>;
}