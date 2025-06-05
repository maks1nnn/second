import { ObjectId } from 'mongodb'
import { rateCollection } from '../db/mongo-db'
import { InputRateType } from '../common/types/rateTypes'

export const rateRepository = {
    async saveUrlLimit(inputData: InputRateType){
    try{
         
        const insertInfo = await rateCollection.insertOne(inputData)
        return insertInfo.insertedId
    }catch(err){
        console.log(err)
        return false
    }
    },

    async findUrlLimit(ip:string , url: string, date: Date){
        //const tenSecondsAgo = date - 10000 ;
    
        
      const result = await rateCollection.countDocuments({
        ip: ip,
        url: url,
         date: {$gte: date}
    });
    console.log(result )
      
    return result  
    }
}