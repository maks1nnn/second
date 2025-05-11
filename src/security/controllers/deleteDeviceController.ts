import { Request,Response } from "express";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";


export const deleteUserSessionController = async(req:Request,res:Response) => {
    try{
        if(req.userId === null){
            res.status(401).send()
            return
        }
        const inputData = {
            id: req.userId,
            deviceId: req.cookies.deviceId}

        const result = await securityService.deleteUserSession(inputData)

        if(result.status === ResultStatus.Unauthorized){
            res.status(401).send()
            return
        }
    }catch(err){
        console.log(err)
        res.status(502).send()
    }
}