import { IOrderRepository } from "../interfaces/IOrderRepository";
import { IOrderService } from "../interfaces/IOrderService";
import { AuthRequest } from "../middleware/genericMiddleware";
import { PedidoDTO } from "../models/DTOs/PedidoDTO";
import { Pedidos } from "../models/entities/Pedidos";
import { Request,Response } from "express";
import { OrderRepository } from "../repositories/OrderRepository";
import { OrderService } from "../services/OrderService";

export class OrderController{
    private readonly orderService:IOrderService;

    constructor(){
        const orderRepo=new OrderRepository();
        this.orderService=new OrderService(orderRepo);
    }

    createOrder=async(req:Request,res:Response):Promise<Response>=>{
        try{
            const orderData:PedidoDTO=req.body;
            const newOrder:Pedidos=await this.orderService.createOrder(orderData);
            if(!newOrder){
                return res.status(400).json({message:"No se pudo crear el pedido"});
            }

            return res.status(201).json(newOrder);

        }catch(error){
            console.error(error);
            return res.status(500).json({message:"Error al crear el pedido"});
        }
    }

    getOrderById=async(req:Request,res:Response):Promise<Response>=>{
        try{
            if(!req.params.id){
                return res.status(400).json({message:"El ID del pedido es requerido"});
            }

            const id:string=req.params.id;
            const order:Pedidos | null=await this.orderService.getOrderById(id);
            if(!order){
                return res.status(404).json({message:"Pedido no encontrado"});
            }
            return res.status(200).json(order);

        }catch(error){
            console.error(error);
            return res.status(500).json({message:"Error al obtener el pedido"});

        }
    }

    getOrdersByUserId=async(req:Request,res:Response):Promise<Response>=>{
        try{
            if(!req.params.userId){
                return res.status(400).json({message:"El ID del usuario es requerido"});
            }

            const userId:string=req.params.userId;
            const orders:Pedidos[]=await this.orderService.getOrdersByUserId(userId);
            if(orders.length===0){
                return res.status(404).json({message:"No se encontraron pedidos para el usuario especificado"});
            }
            return res.status(200).json(orders);
        }catch(error){
            console.error(error);
            return res.status(500).json({message:"Error al obtener los pedidos del usuario"});
        
        }
    }

    getAllOrders=async(req:Request,res:Response):Promise<Response>=>{
        try{
            const orders:Pedidos[]=await this.orderService.getAllOrders();
            if(orders.length===0){
                return res.status(404).json({message:"No se encontraron pedidos"});
            }
            return res.status(200).json(orders);
        }catch(error){
            console.error(error);
            return res.status(500).json({message:"Error al obtener los pedidos"});
        }
    }

    getMyOrders=async(req:AuthRequest,res:Response):Promise<Response>=>{
        try{
            if(!req.user){
                return res.status(401).json({message:"Acceso denegado"});
            }

            console.log("Authenticated user:", req.user);

            const userId:string=req.user!.id;
            console.log("Fetching orders for user ID:", userId);
            const orders:Pedidos[]=await this.orderService.getOrdersByUserId(userId);
            if(orders.length===0){
                return res.status(404).json({message:"No se encontraron pedidos para el usuario"});
            }
            return res.status(200).json(orders);

        }catch(error){
            console.error(error);
            return res.status(500).json({message:"Error al obtener los pedidos del usuario"});
        }
    }
}
