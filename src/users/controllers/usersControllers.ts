import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { UserServise } from '../service/user-servise'
import { queryUserRepository } from '../repository/userMongoQueryRepository'
import { injectable, inject } from 'inversify'

@injectable()
export class UsersControllers {
    constructor(@inject(UserServise) protected userServise: UserServise) {

    }
    async getAllUsers(req: Request, res: Response) {
        const users = await queryUserRepository.getAllUsers(req.query)
        if (users) {
            res.status(200).json(users)
        } else {
            res.sendStatus(404).end()
        }

    }

    async createUser(req: Request, res: Response) {
        const insertUser = await this.userServise.createNewUser(req.body)
        if (insertUser) {

            res.status(201).json(insertUser)

        } else { res.status(404).end() }


    }

    async deleteUser(req: Request, res: Response) {
        const isDeleteUser = await this.userServise.deleteUser(new ObjectId(req.params.id))
        if (isDeleteUser) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }
}

