import { Application, Router, Request, Response} from "express";
import { createUser, deleteUser, getProfile, getUsers, loginUser, updateUser } from "../controllers/users.controller";
import { errorHandler } from "../middlewares/errorHandler.middleware";
import { tokenValidate } from "../middlewares/tokenValidate.middleware";
import validate from "../middlewares/validate.middleware";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware";
import userSchema, { loginSchema, updateUserSchema } from "../schemas/user.schema";


const routes = Router()

const userRoutes = (app:Application) => {

    routes.post(
       "/users", 
       validate(userSchema),
       createUser,
       errorHandler

    )

    routes.post(
        "/login",
        validate(loginSchema),
        loginUser,
        errorHandler
    )

    routes.get(
        "/users",
        tokenValidate,
        verifyAdmin,
        getUsers ,
        errorHandler   
    )

    routes.get(
        "/users/profile",
        tokenValidate,
        getProfile
    )

    routes.patch(
        "/users/:uuid",
        tokenValidate,
        validate(updateUserSchema),
        updateUser,
        errorHandler
    )


    routes.delete(
        "/users/:uuid",
        tokenValidate,
        deleteUser,
        errorHandler
    )
   app.use("/",routes)
}

export default userRoutes