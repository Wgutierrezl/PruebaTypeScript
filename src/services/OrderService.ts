import { IOrderService } from "../interfaces/IOrderService";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { PedidoDTO } from "../models/DTOs/PedidoDTO";
import { Pedidos } from "../models/entities/Pedidos";

export class OrderService implements IOrderService {
    private readonly repo:IOrderRepository;

    constructor(orderRepository:IOrderRepository){
        this.repo=orderRepository;
    }


    async createOrder(orderData: PedidoDTO): Promise<Pedidos> {
        const order=new Pedidos();
            order.usuario_id=orderData.usuario_id;
            order.producto=orderData.producto;
            order.cantidad=orderData.cantidad;
            order.fecha_pedido=new Date();
        
        const createOrder=await this.repo.addOrder(order);
        if(!createOrder){
            throw new Error("Error al crear el pedido");
        }


        return createOrder;


    }


    async getOrderById(id: string): Promise<Pedidos | null> {
        const response=await this.repo.getOrderById(id);
        if(!response){
            return null;
        }
        return response;
    }


    async getOrdersByUserId(userId: string): Promise<Pedidos[]> {
        const response=await this.repo.getOrderByUserId(userId);
        if(!response){
            throw new Error("No se encontraron pedidos para el usuario especificado");
        }
        return response;
    }


    async getAllOrders(): Promise<Pedidos[]> {
        const response=await this.repo.getAllOrders();
        if(!response){
            throw new Error("No se encontraron pedidos");
        }
        return response;
    }
}