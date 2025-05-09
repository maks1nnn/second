import { Result } from "express-validator";
import { ObjectId } from "mongodb";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { ipControlRepository } from "../repository/ipRepository";


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

    async deleteUserSession(){

    },

    async deleteAllSessions(){
        
    }
}