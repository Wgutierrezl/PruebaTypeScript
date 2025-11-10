import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}
export declare const authMiddleware: (allowedRoles?: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => any;
//# sourceMappingURL=genericMiddleware.d.ts.map