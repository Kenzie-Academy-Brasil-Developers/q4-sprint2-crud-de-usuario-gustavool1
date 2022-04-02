import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const validate = (schema: AnySchema) => async (req:Request, res:Response, next:NextFunction) => {
    const data = req.body

    try {
        await schema.validate(data)
        next()
    } catch (e) {
        res.status(400).json({ error: e.errors.join(", ") });
    }
} 

export default validate