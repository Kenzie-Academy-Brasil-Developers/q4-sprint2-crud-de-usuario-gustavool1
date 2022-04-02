import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user";
import { creatingToken, doesPasswordMatches, serializingUser } from "../services/user.services";
import  ErrorHandler  from "../utils/error";
import bcrypt from 'bcrypt'


export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    
    const user = await serializingUser(req.body)

    try {

        const userSaved = await new UserRepository().createUser(user)
        return res.status(201).json(userSaved)
        
    } catch (e) {
        return next(ErrorHandler.badRequest("E-mail already registered"))
    }

}


export const loginUser = async (req:Request, res:Response, next:NextFunction) => {
    
    const { email , password } = req.body

    const user = await new UserRepository().findUser(email)

    if (!user ) {
        return next(ErrorHandler.unauthorized("Wrong email/password"))
    }
    const passwordMatches = await doesPasswordMatches(password, user.password)

    if (!passwordMatches) {
        return next(ErrorHandler.unauthorized("Wrong email/password"))
    }
    
    const token = creatingToken(user)
    return res.json({token})
    
}