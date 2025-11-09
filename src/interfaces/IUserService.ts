import { LoginDTO } from "../models/DTOs/LoginDTO";
import { SessionDTO } from "../models/DTOs/SessionDTO";
import { UsuariosDTO } from "../models/DTOs/UsuarioDTO";
import { Usuarios } from "../models/entities/Usuario";

export interface IUserService{
    newUser(user:UsuariosDTO): Promise<Usuarios>;
    GetUserById(id:string): Promise<Usuarios | null>;
    GetAllUsers(): Promise<Usuarios[] | null>;
    loginUser(log:LoginDTO): Promise<SessionDTO | null>;
}