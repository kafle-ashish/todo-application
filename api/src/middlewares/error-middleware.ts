import { Request, Response } from "express";

export function errorMiddleware(err: Error, req: Request, res: Response) {
    console.error(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    return res.status(statusCode).json({
        message: err.message,
        ...(process.env.NODE_ENV === 'production' ? {} : { stack: err.stack })
    });
}