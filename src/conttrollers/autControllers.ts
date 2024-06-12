import { Request, Response } from "express"
import { authServise } from "../domain/auth-servise"
import { jwtServise } from "../domain/jwt-servise"


export const authControllers = {
    async checkUser(req:Request,res:Response) {
        const isUser = await authServise.checkUser(req.body)
        if (isUser){
            const token = {
                accessToken: await jwtServise.createToken(isUser.id)
              }
            res.status(200).json(token)
        }else{
            res.status(401).end()
        }
        
    },

    async getMyData(){
        
    }
}