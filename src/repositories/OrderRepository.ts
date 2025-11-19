import { IOrderRepository } from "../interfaces/IOrderRepository";
import { Pedidos } from "../models/entities/Pedidos";
import { Repository } from "typeorm";
import AppDataSource from "../config/config-db";

export class OrderRepository implements IOrderRepository{
    private readonly orderRepo:Repository<Pedidos>;

    constructor(){
        this.orderRepo=AppDataSource.getRepository(Pedidos);
    }

    async addOrder(order: Pedidos): Promise<Pedidos> {
        const newOrder=await this.orderRepo.create(order);
        await this.orderRepo.save(newOrder);
        return newOrder;

    }

    async getOrderById(id: string): Promise<Pedidos | null> {
        return await this.orderRepo.findOneBy({id});
    }

    async getOrderByUserId(userId: string): Promise<Pedidos[]> {
        return await this.orderRepo.findBy({usuario_id:userId});
    }

    async getAllOrders(): Promise<Pedidos[]> {
        return await this.orderRepo.find();
        
    }

    async saveChanges(): Promise<void> {
        await AppDataSource.manager.transaction(async () => {});
    }
}