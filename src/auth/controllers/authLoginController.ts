import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { loginServise } from "../servise/authLogin-servise"
import { jwtServise } from "../../domain/jwt-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"


export const loginController = async (req: Request,res:Response) => {
    try{
        const result = await loginServise.loginUser(req.body)
        if(result.status === ResultStatus.BadRequest){
            res.status(401).send({
                errorsMessages: result.extensions 
                 
              })
              return
             
        }
        if(result.status === ResultStatus.Forbidden){
            res.status(403).send({
                errorsMessages: result.extensions 
                 
              })
              return
             
        }
        if(result.status === ResultStatus.Success){
            const { token, refreshToken } = result.data!;
            console.log(result.data)
            res
            .cookie('refreshToken', refreshToken, {
                httpOnly: true, // Защищает от XSS атак
                secure:  true,                
            })
            .status(200)
            .send({
            accessToken: token
        })}
    } catch (err) {
        console.error(err)
        res.status(502).send()
    }
}