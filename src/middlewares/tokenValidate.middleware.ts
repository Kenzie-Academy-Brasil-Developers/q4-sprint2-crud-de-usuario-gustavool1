import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import config from "../database/jwtconfig";
import ErrorHandler from "../utils/error";


export const tokenValidate = async( req:Request, res:Response, next:NextFunction) => {


    if( req.headers.authorization ) {
        
        const token = req.headers.authorization.split(" ")[1]

        if (!token ) {
            return res.status(401).json({message: "missing header authorization."})
        }

        jwt.verify(token, config.secret, (err) => {
    
            if (err) {
                return res.status(401).json({message:"Invalid token"})
            }
            
            return next()
        })    

    } 

}

    