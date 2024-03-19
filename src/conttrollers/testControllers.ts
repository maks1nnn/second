import { Request, Response } from 'express'
import { testRepository } from '../repositories/test-repositories'





export const testControllers = {
    

    deleteAll(req: Request, res: Response) {
        const isDelete = testRepository.deleteAll()
        if (isDelete) {
            res.status(204).end()
        } 
    }



}