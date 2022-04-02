import { NextFunction, Request, Response } from "express";
import UserRepositry from "../repositories/user";
import { serializingUser } from "../services/user.services";
import  ErrorHandler  from "../utils/error";

export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    
    const user = await serializingUser(req.body)

    try {

        const userSaved = await new UserRepositry().createUser(user)
        return res.json(userSaved)
        
    } catch (e) {
        return next(ErrorHandler.badRequest("E-mail already registered"))
    }

}