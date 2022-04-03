import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user";
import { UserInterface } from "../repositories/user/interface";
import { creatingToken, decodingToken, deletingUser, doesPasswordMatches, serializingUser, updatingUser } from "../services/user.services";
import  ErrorHandler  from "../utils/error";


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

    const user = await new UserRepository().findUser({ email })

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


export const getUsers = async(req:Request, res:Response, next:NextFunction) => {
    
    const token = req.headers.authorization.split(" ")[1]

    const user:UserInterface = decodingToken(token)["user"]


    // if (user.isAdm) {

        return res.status(200).send(await new UserRepository().retrieveUsers())
    // }
    // else {
    //     return next(ErrorHandler.unauthorized("Unauthorized"))
    // }

}


export const getProfile =  async (req:Request, res:Response, next:NextFunction) => {
    
    const token = req.headers.authorization.split(" ")[1]
   
    
    const user = decodingToken(token)["user"]

    const {password,...newUser} = user
    return res.send(newUser)
}


export const updateUser =  async (req:Request, res:Response, next:NextFunction) => {
 
    const token = req.headers.authorization.split(" ")[1]
    const { uuid } = req.params 
    const {name, email, password } = req.body

    const userUpdated = await updatingUser({ name, email, password }, uuid, token)

    if (!userUpdated) {
        return next(ErrorHandler.unauthorized("Missing admin permissions"))
    }
    return res.send(userUpdated)


}


export const deleteUser = async (req:Request, res:Response, next:NextFunction) => {
    const { uuid } = req.params
    const token = req.headers.authorization.split(" ")[1]

    const isDeleted = await deletingUser(uuid,token, next)


    if (isDeleted) {
       return res.status(200).send({ message:"User deleted with success" })
    }


}