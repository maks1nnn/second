import { Request, Response } from 'express'
import { testRepository } from '../../repositories/test-repositories'





export const testControllers = {


    async deleteAll(req: Request, res: Response) {
        try {
            const isDelete = await testRepository.deleteAll()
            if (isDelete) {
                return res.status(204).end()
            } else {
                return res.status(401)
            }
            
        } catch (err) {
            console.error(err)
            return res.status(500)
        }


    }

}