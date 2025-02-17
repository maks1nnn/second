import{Request, Response} from 'express'
import { ObjectId } from 'mongodb'
import { userServise } from '../service/user-servise'
import { queryUserRepository } from '../../repositories/userMongoQueryRepository'


export const usersControllers = {
    async getAllUsers(req:Request,res:Response){
        const users = await queryUserRepository.getAllUsers(req.query)
        if(users){
            res.status(200).json(users)
        }else{
            res.sendStatus(404).end()
        }

    },

    async createUser(req:Request,res:Response){
       const insertUser = await userServise.createNewUser(req.body)
       if(insertUser){
       
            res.status(201).json(insertUser)
        
       }else{res.status(404).end()}


    },

    async deleteUser (req:Request,res:Response){
        const isDeleteUser = await userServise.deleteUser(new ObjectId(req.params.id))
        if(isDeleteUser){
            res.status(204).end()
        }else{ 
            res.status(404).end() 
        }
    }
}