import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongodb"
import { send } from "process"
import { jwtServise } from "../../domain/jwt-servise"
import { userServise } from "../../users/service/user-servise"



export const authJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).send()
        return
    }
    const teg = req.headers.authorization.split(' ')[0]
    if (teg !== 'Bearer') {
        res.status(401).send()
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const userId = await jwtServise.verifyToken(token)
    console.log(userId)

    if (userId !== null) {
        const user = await userServise.findById(new ObjectId(userId))
        
        if (user !== undefined && user !== null) {
            req.userId = user.id
            console.log('Confirm: ' + user)
            next()
        }

    } else {
        res.status(401).send('mistake verify')
        return
    }
    // return res.status(401).send("hernya") 

}