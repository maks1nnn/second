import { Request, Response } from "express"


export const authControllers = {
    async checkUser(req:Request,res:Response) {
        const isUser = await authServise.checkUser(req.body)
        if (isUser){
            res.status(204).end()
        }else{
            res.status(401).end()
        }
        
    }
}