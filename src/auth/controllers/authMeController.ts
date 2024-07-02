import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { authServise } from "../servise/auth-servise"
import { jwtServise } from "../../domain/jwt-servise"
import { queryUserRepository } from "../../repositories/userMongoQueryRepository"
import { ResultStatus } from "../../input-uotput-types/resultCode"

export const authMeController = async(req: Request, res: Response)=>{
    try{
    if (!req.userId){
        res.status(403).send()
        return
    }


    const user = await queryUserRepository.getAllUsers(req.userId)
    if(!user){
        res.status(200).send(user)
    }}catch (err){
        console.error(err)
        res.status(502).send()
    }
}