import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { send } from "process";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";

export const getDeviceController = async (req: Request, res: Response) => {
    
     
    try {
        if (req.cookies.refreshToken === null) {
            res.status(401).send('Govno')
            return}

            const result = await securityService.getAllSessions(req.cookies.refreshToken)

            if (result.status === ResultStatus.Unauthorized) {
                res.status(401).send('gecnj')
                return
            }
            if (result.status === ResultStatus.Success) {
                res.status(200).send(result.data)
            }
        }catch (err) {
            console.log(err)
            res.status(502).send('some wrong')
        }
    }