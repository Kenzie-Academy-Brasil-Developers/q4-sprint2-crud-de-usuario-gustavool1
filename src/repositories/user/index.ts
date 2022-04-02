import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { UserInterface, UserRepo } from "./interface";


export default class UserRepositry implements UserRepo {
    
    private ormRepo: Repository<User>

    constructor() {
        this.ormRepo = getRepository(User)
    }

    createUser = async (user: UserInterface) => {

        const userSaved = await this.ormRepo.save(user)
        const { password, ...userSerialized} = userSaved
        
        return userSerialized
    }
}