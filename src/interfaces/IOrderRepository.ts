import { Pedidos } from "../models/entities/Pedidos";

export interface IOrderRepository{
    addOrder(order:Pedidos): Promise<Pedidos>;
    getOrderById(id:string): Promise<Pedidos | null>;
    getOrderByUserId(userId:string): Promise<Pedidos[]>;
    getAllOrders(): Promise<Pedidos[]>;
    saveChanges(): Promise<void>;
}