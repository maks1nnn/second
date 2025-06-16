import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { authServise } from "../servise/authRegister-servise"
import { jwtServise } from "../../domain/jwt-servise"
import { queryUserRepository } from "../../users/repository/userMongoQueryRepository"
import { ResultStatus } from "../../input-uotput-types/resultCode"


export const registrationController = async (req:Request,res:Response) => {
    try{
        const result = await authServise.registrationUser(req.body)
        if (result.status === ResultStatus.BadRequest){
            res.status(400).send({errorsMessages:result.extensions})
             
        }
        if(result.status === ResultStatus.Success){res.status(204).send()}
    }catch (err) {
        console.error(err)
        res.status(502).send()
    }
}