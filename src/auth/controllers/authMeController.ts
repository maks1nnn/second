import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { userServise } from "../../users/service/user-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"
import { authServise } from "../servise/auth-servise"
 
 

export const authMeController = async(req: Request, res: Response)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
        
        console.log('YYYY' + refreshToken)
        console.log('YYYY' + req.userId)
     if (req.userId === null){
        res.status(401).send('Govno')
        return
    } 


    const user = await  userServise.findByIdForMe(new ObjectId(req.userId))
    if(user){
         
        res.status(200).send(user)
    }}catch (err){
        console.error(err)
        res.status(502).send()
    }
}