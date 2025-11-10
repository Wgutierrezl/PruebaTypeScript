import { Request, Response } from "express";
import { AuthRequest } from "../middleware/genericMiddleware";
export declare class UserController {
    private readonly _service;
    constructor();
    register: (req: Request, res: Response) => Promise<Response>;
    login: (req: Request, res: Response) => Promise<Response>;
    getAll: (req: Request, res: Response) => Promise<Response>;
    getById: (req: Request, res: Response) => Promise<Response>;
    getProfile: (req: AuthRequest, res: Response) => Promise<Response>;
}
//# sourceMappingURL=UserController.d.ts.map