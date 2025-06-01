import { Request,Response } from "express";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";
import { jwtServise } from "../../domain/jwt-servise";

export const deleteUserSessionController = async(req:Request,res:Response) => {
    try{
        //console.log('heeeeelp' + req.params.deviceId)
        if( !req.params.deviceId){
            res.status(204).send()
            return
        }
        
        
        const decoded = await jwtServise.decodeToken(req.cookies.refreshToken)
        if(!decoded){
            return res.status(404).send()
            
        }

        const inputData = {
            id: decoded.id,
            deviceId: req.params.deviceId}

        const result = await securityService.deleteUserSession(inputData)

        if(result.status === ResultStatus.Unauthorized){
            console.log('ebanina')
            return res.status(401).send()
            
        }

        return res.status(204)
    }catch(err){
        console.log(err)
        res.status(502).send()
    }
}