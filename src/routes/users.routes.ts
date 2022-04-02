import { Application, Router, Request, Response} from "express";
import { createUser } from "../controllers/users.controller";
import { errorHandler } from "../middlewares/errorHandler.middleware";
import validate from "../middlewares/validate.middleware";
import userSchema from "../schemas/user.schema";


const routes = Router()

const userRoutes = (app:Application) => {

   routes.post(
       "/", 
       validate(userSchema),
       createUser,
       errorHandler

   )

   app.use("/users",routes)
}

export default userRoutes