import { Result } from "express-validator";
import { ObjectId } from "mongodb";
import { ipControlCollection } from "../../db/mongo-db";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { ipControlRepository } from "../repository/ipRepository";
import { DeleteSessionByDeviceIdType } from "../types/ipDbTypes";


export const securityService = {

    async getAllSessions(id:ObjectId ){
        const session = await ipControlRepository.findAllSessionByUserId(id)
         if(session === null){
            return{
                status: ResultStatus.Unauthorized,
                extensions: [{field:"code", message: 'not fount user session'}],
                data:null,
            }
         }

         return {
            status: ResultStatus.Success,
            data: session
         }
    },

    async deleteUserSession(inputData: DeleteSessionByDeviceIdType){
        const result = await ipControlRepository.deleteSessionByDeviceId(inputData)
        if (result === null){
            return{
                status: ResultStatus.Unauthorized,
                extensions: [{field:"code", message: 'not found device'}],
                data: null,
            }
        }

        return{
            status: ResultStatus.Success,
            data: result
        }
    },

    async deleteAllSessions(userId:ObjectId){
        const result = await ipControlRepository.deleteAllSesionsByUserId(userId)
        if (result === null){
            return{
                status: ResultStatus.Unauthorized,
                extensions: [{field:"code", message: 'not found device'}],
                data: null,
            }
        }
        return{
            status: ResultStatus.Success,
            data: result
        }
    }
}