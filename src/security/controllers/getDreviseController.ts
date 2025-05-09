import { Request,Response } from "express";
import { ObjectId } from "mongodb";
import { send } from "process";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";

export const getDeviceController = async(req:Request,res:Response) => {
    try{
        if(req.userId === null){
            res.status(401).send()
            return
        }
        const result = await securityService.getAllSessions(new ObjectId(req.userId) )

        if(result.status === ResultStatus.Unauthorized){
            res.status(401).send()
            return
        }
        if(result.status === ResultStatus.Success){
            res.status(200).send(result.data)
        }
    }catch(err){
        console.log(err)
        res.status(502).send()
    }
}