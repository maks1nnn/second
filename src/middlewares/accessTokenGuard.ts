import {NextFunction, Request, Response} from "express"
import { authServise } from "../auth/servise/auth-servise";
import { ResultStatus } from "../input-uotput-types/resultCode";



export const accessTokenGuard = async ( req: Request,
                                        res: Response,
                                        next: NextFunction) => {
    if(!req.headers.authorization) return res.sendStatus(401);
       
    const result = await authServise.checkAccessToken(req.headers.authorization)
        
    if(result.status === ResultStatus.Success) {
        req.user = result.data as IdType
        return next()
    }

    return res.sendStatus(401)
}