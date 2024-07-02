import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { authServise } from "../servise/auth-servise"
import { jwtServise } from "../../domain/jwt-servise"


export const authControllers = {
    async checkUser(req: Request, res: Response) {
        const isUser = await authServise.checkUser(req.body)
        if (isUser) {

            res.status(200).end()
        } else {
            res.status(401).end()
        }

    },

    async getUserByToken(req: Request, res: Response) {
        const userId = await authServise.checkUser(req.body)
        if (userId !== null && userId !== undefined) {
             const jwt = await jwtServise.createToken(userId.id)
             console.log(jwt)
              const token = {
                accessToken: jwt
              } 
            res.status(200).json(token)
        } else {
            res.status(401).end()
        }
    },

    async getMyData() {

    },

    async registrationConfirmation() {

    },

    async registration () {

    },

    async registrationEmailResending (){

    },
}