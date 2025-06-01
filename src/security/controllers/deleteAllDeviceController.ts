import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";
import { jwtServise } from "../../domain/jwt-servise";


export const deleteAllDevicesController = async (req: Request, res: Response) => {

    try {
        if (!req.cookies.refreshToken) {
            return res.status(401).send()

        }
        const decoded = await jwtServise.decodeToken(req.cookies.refreshToken)
        if (!decoded) {
            return res.status(404).send()

        }

        const result = await securityService.deleteAllSessions(decoded.id)

        if (result.status === ResultStatus.Unauthorized) {
            return res.status(401).send()

        } else if (result.status === ResultStatus.Success) {
            return res.status(204).send()
        }
        return res.status(401).send('kostill');
    } catch (err) {
        console.log(err)
        return res.status(502).send()
    }
}