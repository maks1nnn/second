import { ObjectId } from 'mongodb'
import { rateCollection } from '../db/mongo-db'
import { InputRateType } from '../common/types/rateTypes'

export const rateRepository = {
    async saveUrlLimit(inputData: InputRateType){

    },

    async findUrlLimit(ip:string , url: string){

    }
}