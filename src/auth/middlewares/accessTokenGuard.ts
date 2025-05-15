import {NextFunction, Request, Response} from "express"
import { loginServise } from "../servise/authLogin-servise";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { IdType } from "../../users/types/user-types";



export const accessTokenGuard = async ( req: Request,
                                        res: Response,
                                        next: NextFunction) => {
    if(!req.headers.authorization) return res.sendStatus(401);
       
    const result = await loginServise.checkAccessToken(req.headers.authorization)
        
    if(result.status === ResultStatus.Success && result.data !== null) {
        req.userId =  result.data.id as string
        return next()
    }

    return res.sendStatus(401)
}