import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { send } from "process";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";

export const getDeviceController = async (req: Request, res: Response) => {
    
     
    try {
        if (req.cookies.refreshToken === null) {
            return res.status(401).send('Govno')
            }

            const result = await securityService.getAllSessions(req.cookies.refreshToken)

            if (result.status === ResultStatus.Unauthorized) {
                return res.status(401).send('gecnj')
                
            }
            if (result.status === ResultStatus.Success) {
                return res.status(200).send(result.data)
            }
            if (result.status === ResultStatus.BadRequest) {
                return res.status(401).send(result.data)
            }
        }catch (err) {
            console.log(err)
            return res.status(502).send('some wrong')
        }
    }