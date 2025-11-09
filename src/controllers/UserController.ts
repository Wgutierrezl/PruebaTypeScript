import { Request, Response } from "express";
import { IUserService } from "../interfaces/IUserService";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { TokenService } from "../custom/Security/TokenService";
import { HasherService } from "../custom/Security/HasherService";
import AppDataSource from "../config/config-db";
import { UsuariosDTO } from "../models/DTOs/UsuarioDTO";
import { LoginDTO } from "../models/DTOs/LoginDTO";
import { AuthRequest } from "../middleware/genericMiddleware";

export class UserController {
  private readonly _service: IUserService;

  constructor() {
    // ✅ Inicializamos las clases concretas
    const userRepo = new UserRepository(); // implementación concreta del repositorio
    const tokenService = new TokenService();            // implementación concreta del token
    const hasher = new HasherService();                 // implementación concreta del hasher

    // ✅ Pasamos las implementaciones al servicio que recibe interfaces
    this._service = new UserService(userRepo, tokenService, hasher);
  }

  // Registro de usuario
  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dto: UsuariosDTO = req.body;
      const user = await this._service.newUser(dto);
      return res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Error al registrar el usuario" });
    }
  };

  // Login
  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dto: LoginDTO = req.body;
      const session = await this._service.loginUser(dto);

      if (session==null) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      return res.status(200).json(session);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Error al iniciar sesión" });
    }
  };

  // Obtener todos los usuarios
  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this._service.GetAllUsers();
      if (!users) {
        return res.status(404).json({ message: "No hay usuarios" });
      }
      return res.status(200).json(users);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener usuarios" });
    }
  };

  //ObtenerSoloUnUsuario
  getById=async(req: Request, res:Response): Promise<Response> => {
    try{
        const {id}=req.params;

        if (!id) {
            return res.status(400).json({ message: "El ID es requerido" });
        }
        const user=await this._service.GetUserById(id);


        
        if(user==null){
            return res.status(404).json({message:"user not found"});
        }

        return res.status(200).json(user);

    }catch(error:any){
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el usuario" });

    }
  }

  getProfile=async(req:AuthRequest, res:Response): Promise<Response>=>{
    try{
      if(!req.user){
        return res.status(401).json({message:'Access denied'});
      }

      const user=await this._service.GetUserById(req.user.id);
      if(user==null){
        return res.status(404).json({message:'user not found'});
      }

      return res.status(200).json(user);

    }catch(error:any){
      console.error(error);
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }
}
