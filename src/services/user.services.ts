import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { UserInterface } from '../interfaces/User.interface'


export const serializingUser = async (user: UserInterface ) => {

    return {
        uuid:v4(),
        name: user.name,
        email:user.email,
        password: await bcrypt.hash(user.password, 10),
        isAdm: user.isAdm,
    }
}