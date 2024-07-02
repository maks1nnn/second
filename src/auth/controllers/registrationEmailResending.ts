import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { authServise } from "../servise/auth-servise"
import { jwtServise } from "../../domain/jwt-servise"
import { queryUserRepository } from "../../repositories/userMongoQueryRepository"
import { ResultStatus } from "../../input-uotput-types/resultCode"


export const registrationEmailResendingController = async (req:Request,res:Response) => {
  
        const result = await authServise.registrationEmailResendig(req.body)
        if (result.status === ResultStatus.BadRequest){
            res.status(404).send()
            return
        }
        res.status(204).send()
     
}