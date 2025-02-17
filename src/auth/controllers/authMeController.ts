import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { userServise } from "../../users/service/user-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"
 
 

export const authMeController = async(req: Request, res: Response)=>{
    try{
        
        console.log(req.userId)
    if (!req.userId){
        res.status(401).send()
        return
    }


    const user = await  userServise.findByIdForMe(new ObjectId(req.userId))
    if(!user){
         
        res.status(200).send(user)
    }}catch (err){
        console.error(err)
        res.status(502).send()
    }
}