import { NextFunction, Request, Response } from "express";
import { decodingToken } from "../services/user.services";
import ErrorHandler from "../utils/error";

export const verifyAdmin = (req:Request, res:Response, next:NextFunction) => {

    const token = req.headers.authorization.split(" ")[1]
    
    const decodedUser = decodingToken(token)["user"]

    if (!decodedUser.isAdm) {
        return next(ErrorHandler.unauthorized("Unauthorized"))
    }

    next()
}