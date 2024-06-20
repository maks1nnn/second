import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongodb"
import { send } from "process"
import { jwtServise } from "../domain/jwt-servise"
import { userServise } from "../domain/user-servise"



export const authJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }
    const teg = req.headers.authorization.split(' ')[0]
    if (teg !== 'Bearer') {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const userId = await jwtServise.verifyToken(token)
    console.log(userId)

    if (userId !== null) {
        const user = await userServise.findById(new ObjectId(userId))
        console.log(user)
        if (user !== null) {
            req.userId = user.id
            next()
        }

    } else {
        res.status(401).send('mistake verify')
        return
    }
    // return res.status(401).send("hernya") 

}