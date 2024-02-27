import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config';
import { Types } from 'mongoose';

export interface UserPayload {
    id: Types.ObjectId;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    try {
        const token = req.headers.authorization;
        const payload = verify(token, config.jwtKey) as UserPayload;
        console.log(typeof payload);

        req.currentUser = { ...payload, id: new Types.ObjectId(payload.id) };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Not authorized' });
    }
};
