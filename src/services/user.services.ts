import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { UserInterface } from '../interfaces/User.interface'
import jwt from 'jsonwebtoken'
import config  from '../database/jwtconfig'
import ErrorHandler from '../utils/error'
import { UserUpdate } from '../interfaces/UserUpdate.interface'
import UserRepository from '../repositories/user'
import { NextFunction } from 'express'



export const serializingUser = async (user: UserInterface ) => {

    return {
        uuid:v4(),
        name: user.name,
        email:user.email,
        password: await bcrypt.hash(user.password, 10),
        isAdm: user.isAdm,
    }
}


export const doesPasswordMatches = async (password:string, dbPass:string) => {

    return await bcrypt.compare(password, dbPass)
}


export const creatingToken = (user:UserInterface) => {

    const token  = jwt.sign({ user }, config.secret, { expiresIn: config.expiresIn })
    return token 
}



export const decodingToken = (token:string) : UserInterface =>  {

    const decoded  = jwt.verify(token, config.secret, (err, decoded) => {

        if (err) {
          return false
        }
        
        if (decoded) {
           return decoded as UserInterface
        }
    });


    return decoded as unknown as UserInterface

}   

export const updatingUser = async (userUpdate: UserUpdate, uuid:string, token:string) =>  {
    
    const user = await new UserRepository().findUser({ uuid })

    const decodedUser = decodingToken(token)["user"]

    if(decodedUser.uuid !== uuid && !decodedUser.isAdm){
        return false
    }

    const keysUpdate = Object.keys(userUpdate)

    for (let i = 0; i< keysUpdate.length; i++) {

        if( keysUpdate[i] !== "password") {
            
            user[keysUpdate[i]] =  userUpdate[keysUpdate[i]]
        };


        if(keysUpdate[i] === "password" && userUpdate.password ) {
            user[keysUpdate[i]] = await bcrypt.hash( userUpdate[keysUpdate[i]], 10)
            
        }
        
        
    }

    await new UserRepository().updatingUser(user)

    const userUpdated = await new  UserRepository().findUser({ uuid }) 
    const { password, ...finalUser } = userUpdated


    return finalUser
}



export const deletingUser = async (uuid:string, token:string, next:NextFunction) => {
    
    const decodedUser = decodingToken(token)["user"]

    if (decodedUser.uuid !== uuid && !decodedUser.isAdm) {
        return next(ErrorHandler.unauthorized("Missing admin permissions"))
    }

    const deletedUser = await new UserRepository().deleteUser(uuid)

    if(deletedUser.affected >= 1) {
        return true
    }

    return next(ErrorHandler.notFound("User not found"))
} 