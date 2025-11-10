import { IHasherService } from "./IHasherService";
export declare class HasherService implements IHasherService {
    comparePassword(password: string, hashed: string): boolean;
    encryptPassword(password: string): string;
}
//# sourceMappingURL=HasherService.d.ts.map