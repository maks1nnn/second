import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongodb"
import { send } from "process"
import { jwtServise } from "../../domain/jwt-servise"
import { UserRepository } from "../../users/repository/userMongoRepository"
import { UserServise } from "../../users/service/user-servise"

const userServise = new UserServise(new UserRepository())

export const authJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).send('govno')
        return
    }
    const teg = req.headers.authorization.split(' ')[0]
    if (teg !== 'Bearer') {
        res.status(401).send('parasha')
        return
    }

    const token = req.headers.authorization.split(' ')[1]
     
    const userId = await jwtServise.verifyToken(token)
    

    if (userId !== null) {
        const user = await userServise.findById(new ObjectId(userId))
        
        if (user !== undefined && user !== null) {
            req.userId = user.id
            next()
        }

    } else {
        res.status(401).send('mistake verify')
        return
    }
    

}