import { Request,Response } from "express";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";


export const deleteUserSessionController = async(req:Request,res:Response) => {
    try{
        console.log('heeeeelp')
        if(req.userId === null){
            res.status(404).send()
            return
        }
        const inputData = {
            id: req.userId,
            deviceId: req.params.deviceId}

        const result = await securityService.deleteUserSession(inputData)

        if(result.status === ResultStatus.Unauthorized){
            console.log('ebanina')
            res.status(404).send()
            return
        }
    }catch(err){
        console.log(err)
        res.status(502).send()
    }
}