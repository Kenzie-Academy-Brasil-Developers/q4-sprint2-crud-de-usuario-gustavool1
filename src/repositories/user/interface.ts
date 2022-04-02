import ErrorHandler from "../../utils/error"

interface UserInterface {
    name:string,
    email:string,
    password?:string
    isAdm?: boolean,
    createdOn?: Date,
    updatedOn?:Date
}

interface UserRepo {

    createUser: (user:UserInterface) => Promise<UserInterface>
    findUser : (email:string) => Promise<UserInterface> 
}

export { UserInterface, UserRepo }