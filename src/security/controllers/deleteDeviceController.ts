/*import { Request,Response } from "express";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { securityService } from "../servise/security-servise";
import { jwtServise } from "../../domain/jwt-servise";
import { ipControlRepository } from "../repository/ipRepository";

export const deleteUserSessionController = async (req: Request, res: Response) => {
    try {
        if (!req.params.deviceId) {
            return res.status(404).send('deviceId not found');
        }
        if (!req.cookies.refreshToken) {
            return res.status(401).send("Refresh token missing");
        }

        const decoded = await jwtServise.verifyRefreshToken(req.cookies.refreshToken);
        if (!decoded) {
            return res.status(401).send("Invalid token");
        }
        
        const checkDevice = await ipControlRepository.findSessionByDeviceId(req.params.deviceId)
        
        if( checkDevice === null){
            return res.status(404).send('deviceId not found')
        }
        
        

        const inputData = {
            id: decoded.id,
            deviceId: req.params.deviceId
        };

        const result = await securityService.deleteUserSession(inputData);
        if (!result) {
            return res.status(403).send("Session not found");
        }
        
        if (result.status === ResultStatus.Unauthorized) {
            return res.status(403).send("device not found"); // 403 Forbidden
        }

       


        if (result.status === ResultStatus.Success) {
            return res.status(204).send();
        }

        
         return res.status(500).send("Unexpected result status");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
};*/