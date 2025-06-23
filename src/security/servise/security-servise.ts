import { Result } from "express-validator";
import { ObjectId } from "mongodb";
import { ipControlCollection } from "../../db/mongo-db";
import { jwtServise } from "../../domain/jwt-servise";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { IpControlRepository } from "../repository/ipRepository";
import { DeleteSessionByDeviceIdType } from "../types/ipDbTypes";
import {injectable, inject} from 'inversify'

@injectable()
export class SecurityService  {
    constructor(@inject(IpControlRepository)protected ipControlRepository: IpControlRepository){

    }

    async getAllSessions(reftoken: string) {
        const decoded = await jwtServise.decodeToken(reftoken)

        if (!decoded) {
            return {
                status: ResultStatus.BadRequest,
                data: null
            }
        }
        const session = await this.ipControlRepository.findAllSessionByUserId(decoded.id)
        if (session === null) {
            return {
                status: ResultStatus.Unauthorized,
                extensions: [{ field: "code", message: 'not fount user session' }],
                data: null,
            }
        }

        return {
            status: ResultStatus.Success,
            data: session
        }
    }

    async deleteUserSession(inputData: DeleteSessionByDeviceIdType) {
        const result = await this.ipControlRepository.deleteSessionByDeviceId(inputData)
        if (result === null) {
            return {
                status: ResultStatus.Unauthorized,
                extensions: [{ field: "code", message: 'not found device' }],
                data: null,
            }
        }else {
            return {
                status: ResultStatus.Success,
                
            }
        }

        
    }

    async deleteAllSessions(userId: string, deviceId: string) {
        const result = await this.ipControlRepository.deleteAllSessionsByUserId(userId, deviceId)
        if (result === null) {
            return {
                status: ResultStatus.Unauthorized,
                extensions: [{ field: "code", message: 'not found device' }],
                data: null,
            }
        }else{
        return {
            status: ResultStatus.Success,
            data: result
        }}
    }
}