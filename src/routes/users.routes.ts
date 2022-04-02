import { Application, Router, Request, Response} from "express";
import { createUser, loginUser } from "../controllers/users.controller";
import { errorHandler } from "../middlewares/errorHandler.middleware";
import validate from "../middlewares/validate.middleware";
import userSchema, { loginSchema } from "../schemas/user.schema";


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

   app.use("/",routes)
}

export default userRoutes