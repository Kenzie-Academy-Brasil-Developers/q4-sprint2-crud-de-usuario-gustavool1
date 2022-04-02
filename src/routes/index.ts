import express, { Application } from "express";
import userRoutes from "./users.routes";


const routes = (app:Application) => {
    app.use(express.json())

    userRoutes(app)
}

export default routes