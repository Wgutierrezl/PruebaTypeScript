import { IUserRepository } from "../interfaces/IUserRepository";
import { Usuarios } from "../models/entities/Usuario";
export declare class UserRepository implements IUserRepository {
    private readonly userRepo;
    constructor();
    getUserByEmail(email: string): Promise<Usuarios | null>;
    addUser(user: Usuarios): Promise<Usuarios>;
    getUserById(id: string): Promise<Usuarios | null>;
    getAllUsers(): Promise<Usuarios[]>;
    saveChanges(): Promise<void>;
}
//# sourceMappingURL=UserRepository.d.ts.map