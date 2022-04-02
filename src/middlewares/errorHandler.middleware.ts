import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error";

export const errorHandler = (err:ErrorHandler, req:Request, res:Response, next:NextFunction) => {

    if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json({ message:err.message })
        return;
    }


    res.status(500).json({ error:"deu merda" })
}