import { Usuarios } from "../../models/entities/Usuario";

export interface ITokenService{
    generateToken(user: Usuarios): string;
}