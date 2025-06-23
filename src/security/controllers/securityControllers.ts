import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";
import { send } from "process";
import { jwtServise } from "../../domain/jwt-servise";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { IpControlRepository } from "../repository/ipRepository";
import { SecurityService } from "../servise/security-servise";

@injectable()
export class SecurityControllers {
    constructor(@inject(SecurityService) protected securityService: SecurityService,
                @inject(IpControlRepository)protected ipControlRepository:IpControlRepository) {

    }
    async deleteAllDevicesController(req: Request, res: Response) {

        try {
            if (!req.cookies.refreshToken) {
                return res.status(401).send()

            }
            const decoded = await jwtServise.decodeToken(req.cookies.refreshToken)
            if (!decoded) {
                return res.status(404).send()

            }

            const result = await this.securityService.deleteAllSessions(decoded.id, decoded.deviceId)

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

     async deleteUserSessionController   (req: Request, res: Response)   {
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

            const checkDevice = await this.ipControlRepository.findSessionByDeviceId(req.params.deviceId)

            if (checkDevice === null) {
                return res.status(404).send('deviceId not found')
            }
            const inputData = {
                id: decoded.id,
                deviceId: req.params.deviceId
            };

            const result = await this.securityService.deleteUserSession(inputData);
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
    }
     async getDeviceController  (req: Request, res: Response)  {
    
     
        try {
            if (req.cookies.refreshToken === null) {
                return res.status(401).send('Govno')
                }
    
                const result = await this.securityService.getAllSessions(req.cookies.refreshToken)
    
                if (result.status === ResultStatus.Unauthorized) {
                    return res.status(401).send('gecnj')
                    
                }
                if (result.status === ResultStatus.Success) {
                    return res.status(200).send(result.data)
                }
                if (result.status === ResultStatus.BadRequest) {
                    return res.status(401).send(result.data)
                }
                return res.status(500).send("Unexpected result status");
    
            }catch (err) {
                console.log(err)
                return res.status(502).send('some wrong')
            }
        }
}