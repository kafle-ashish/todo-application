import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validateRequest = (schema: Schema, section: "body" | "query" | "params" = "body") =>
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params, req.query);

        const { error } = schema.validate(
            req[section],
            { abortEarly: false }
        );

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    };