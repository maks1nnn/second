import { Request,Response } from "express";
import { ObjectId } from "mongodb";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";


export const deleteAllDevicesController = async(req:Request,res:Response) => {
    console.log('EEEEEEEEEEEEEEE')
    try{
        if(req.userId === null){
            res.status(401).send()
            return
        }

    const result = await securityService.deleteAllSessions( req.userId )

    if(result.status === ResultStatus.Unauthorized){
        res.status(401).send()
        return
    }
}catch(err){
    console.log(err)
    res.status(502).send()
}
}