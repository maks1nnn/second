import { Request, Response } from 'express'
import { testRepository } from '../../repositories/test-repositories'





export const testControllers = {
    

    async deleteAll(req: Request, res: Response) {
        const isDelete = await testRepository.deleteAll()
        if (isDelete) {
            res.status(204).end()
        } 
    }



}