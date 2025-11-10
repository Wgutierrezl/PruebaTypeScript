export interface IHasherService {
    encryptPassword(password: string): string;
    comparePassword(password: string, hashed: string): boolean;
}
//# sourceMappingURL=IHasherService.d.ts.map