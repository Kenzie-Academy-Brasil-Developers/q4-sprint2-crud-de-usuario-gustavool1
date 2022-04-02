import { resolve } from "path";
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { UserInterface, UserRepo } from "./interface";


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

    findUser = async (email:string) => {
        const user = await this.ormRepo.findOne( 
        { 
            where: {
                email
            }
        })

        return user
    }

    
}