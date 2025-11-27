import { IOrderService } from "../interfaces/IOrderService";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { PedidoDTO } from "../models/DTOs/PedidoDTO";
import { Pedidos } from "../models/entities/Pedidos";
import { OrderUsDTO } from "../models/DTOs/OrderUsDTO";

export class OrderService implements IOrderService {
    private readonly repo:IOrderRepository;

    constructor(orderRepository:IOrderRepository){
        this.repo=orderRepository;
    }
    async createMyOrder(orderData: OrderUsDTO, userId: string): Promise<Pedidos> {
        const order=new Pedidos();
            order.usuario_id=userId;
            order.producto=orderData.producto;
            order.cantidad=orderData.cantidad;
            order.fecha_pedido=new Date();

        const createOrders=await this.repo.addOrder(order);

        console.log("Created Order:", createOrders);
        
        if(!createOrders){
            throw new Error("Error al crear el pedido");
        }

        return createOrders;
        
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
        console.log("Orders for user:", response);
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