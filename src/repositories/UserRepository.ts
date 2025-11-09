import { IUserRepository } from "../interfaces/IUserRepository";
import { Usuarios } from "../models/entities/Usuario";
import { Repository } from "typeorm";
import AppDataSource from "../config/config-db";

export class UserRepository implements IUserRepository{
    private readonly userRepo: Repository<Usuarios>;

    constructor(){
        this.userRepo=AppDataSource.getRepository(Usuarios);
    }

    async getUserByEmail(email: string): Promise<Usuarios | null> {
        return await this.userRepo.findOneBy({correo:email});
    }

    async addUser(user: Usuarios): Promise<Usuarios> {
        const newUser=this.userRepo.create(user);
        return await this.userRepo.save(newUser);
    }

    async getUserById(id: string): Promise<Usuarios | null> {
        return await this.userRepo.findOneBy({id});
    }

    async getAllUsers(): Promise<Usuarios[]> {
        return await this.userRepo.find();
        
    }
    async saveChanges(): Promise<void> {
        await AppDataSource.manager.transaction(async () => {});
    }
    
}