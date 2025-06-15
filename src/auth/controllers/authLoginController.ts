import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { loginServise } from "../servise/authLogin-servise"
import { jwtServise } from "../../domain/jwt-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"


export const loginController = async (req: Request, res: Response) => {

    try {
        
        const title = req.headers['user-agent'] || 'Unknown Device'
        
        const ip = req.ip || 'djondow'

        

        const result = await loginServise.loginUser(req.body, title, ip)
        if (result.status === ResultStatus.BadRequest) {
            return res.status(401).send({
                errorsMessages: result.extensions
            })
            

        }
        if (result.status === ResultStatus.Forbidden) {
            return res.status(403).send({
                errorsMessages: result.extensions
            })
             
        }
        if (result.status === ResultStatus.Success) {
            const { token, refreshToken } = result.data!;
            //console.log(result.data)
            return res
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true, // Защищает от XSS атак
                    secure: true,
                })
                .status(200)
                .send({
                    accessToken: token
                })
        }

        return res.status(500).send("Unexpected result status");
    } catch (err) {
        console.error(err)
       return res.status(502).send()
    }
}