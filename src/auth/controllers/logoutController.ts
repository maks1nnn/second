import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { authServise } from "../servise/auth-servise"
import { jwtServise } from "../../domain/jwt-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"

export const logoutController = async (req:Request, res:Response) =>{
    try{
        const refreshToken = req.cookies.refreshToken;
         

        if(!refreshToken){
            res.status(401).send()
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(204).send();

    }catch (err){
        console.error(err)
        res.status(502).send()
    }
    
}