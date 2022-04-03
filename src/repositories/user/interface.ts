import { DeleteResult } from "typeorm"

interface UserInterface {
    name:string,
    email:string,
    password?:string
    isAdm?: boolean,
    createdOn?: Date,
    updatedOn?:Date
}

interface findInterface {
    email?:string,
    uuid?:string
}
interface UserRepo {

    createUser: (user:UserInterface) => Promise<UserInterface>
    findUser : (user:findInterface) => Promise<UserInterface> 
    retrieveUsers: () => Promise<UserInterface[]>
    updatingUser: (user:UserInterface) => Promise<UserInterface>
    deleteUser: (uuid:string) => Promise<DeleteResult>
}

export { UserInterface, UserRepo }