import { Usuarios } from "../models/entities/Usuario";
export interface IUserRepository {
    addUser(user: Usuarios): Promise<Usuarios>;
    getUserById(id: string): Promise<Usuarios | null>;
    getUserByEmail(email: string): Promise<Usuarios | null>;
    getAllUsers(): Promise<Usuarios[]>;
    saveChanges(): Promise<void>;
}
//# sourceMappingURL=IUserRepository.d.ts.map