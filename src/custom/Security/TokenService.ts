import { Usuarios } from "../../models/entities/Usuario";
import { ITokenService } from "./ITokenService";
import jwt, { SignOptions } from "jsonwebtoken";

export class TokenService implements ITokenService {
  generateToken(user: Usuarios): string {
    const payload = {
      id: user.id,
      email: user.correo,
      name: user.nombre,
      role:user.rol ?? 'Default'
    };

    const secret = process.env.JWT_SECRET!;
    const expiresIn = process.env.JWT_EXPIRES_IN ?? "1h"

    const token = jwt.sign(payload, secret, { 
      expiresIn: expiresIn 
    } as SignOptions);


    return token;
  }
}
