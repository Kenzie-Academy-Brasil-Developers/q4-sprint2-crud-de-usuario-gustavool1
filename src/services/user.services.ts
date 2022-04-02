import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { UserInterface } from '../interfaces/User.interface'
import jwt from 'jsonwebtoken'
import config  from '../database/jwtconfig'

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