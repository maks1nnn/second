import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { authServise } from "../servise/auth-servise"
import { jwtServise } from "../../domain/jwt-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"


export const loginController = async (req: Request,res:Response) => {
    try{
        const result = await authServise.loginUser(req.body)
        if(result.status === ResultStatus.BadRequest){
            res.status(400).send({
                errorsMessages: result.extensions 
                 
              })
              return
             
        }
        if(result.status === ResultStatus.Success){ res.status(200).send({
            accessToken: result.data!
        })}
    } catch (err) {
        console.error(err)
        res.status(502).send()
    }
}