import { IUserService } from "../interfaces/IUserService";
import { UsuariosDTO } from "../models/DTOs/UsuarioDTO";
import { Usuarios } from "../models/entities/Usuario";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ITokenService } from "../custom/Security/ITokenService";
import { IHasherService } from "../custom/Security/IHasherService";
import { LoginDTO } from "../models/DTOs/LoginDTO";
import { SessionDTO } from "../models/DTOs/SessionDTO";
export declare class UserService implements IUserService {
    private readonly _repo;
    private readonly _tokenService;
    private readonly _hasher;
    /**
     *
     */
    constructor(repo: IUserRepository, tokenService: ITokenService, hasher: IHasherService);
    newUser(user: UsuariosDTO): Promise<Usuarios>;
    GetUserById(id: string): Promise<Usuarios | null>;
    GetAllUsers(): Promise<Usuarios[] | null>;
    loginUser(log: LoginDTO): Promise<SessionDTO | null>;
}
//# sourceMappingURL=UserService.d.ts.map