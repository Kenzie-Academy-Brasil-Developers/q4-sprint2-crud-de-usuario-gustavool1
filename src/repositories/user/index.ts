import { userInfo } from "os";
import { resolve } from "path";
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { UserInterface, UserRepo } from "./interface";

interface FindInterface {
    email?:string,
    uuid?:string
}

export default class UserRepository implements UserRepo {
    
    private ormRepo: Repository<User>

    constructor() {
        this.ormRepo = getRepository(User)
    }


    
    createUser = async (user: UserInterface) => {

        const userSaved = await this.ormRepo.save(user)
        const { password, ...userSerialized} = userSaved
        
        return userSerialized
    }

    findUser = async (possibleUser:FindInterface) => {
   
        if(possibleUser.email){

            const user = await this.ormRepo.findOne( 
            { 
                where: {
                    email: possibleUser.email
                }
            })
    
            return user
        }

        if (possibleUser.uuid) {
            
            const user = await this.ormRepo.findOne( 
            { 
                where: {
                    uuid: possibleUser.uuid
                }
            })
        
            return user
        }
    }

    retrieveUsers = async () => {

        const users = await this.ormRepo.find()

        const newUsers = users.map((user) => {

            const {password, ...newUser } = user

            return newUser
        })
        return newUsers
    }

    updatingUser = async (user:UserInterface) => {

        const userUpdated = await this.ormRepo.save(user)
        
        console.log(userUpdated)
        return userUpdated
    }


    deleteUser = async (uuid:string) => {

      
        
        const deletedUser = await this.ormRepo.delete(uuid)


        return deletedUser
    }
   
    
}