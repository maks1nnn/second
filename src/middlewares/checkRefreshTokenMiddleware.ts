/*import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongodb"
import { send } from "process"
import { jwtServise } from "../domain/jwt-servise"
import { ipControlRepository } from "../security/repository/ipRepository"
import { userServise } from "../users/service/user-servise"

export const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.cookies.refreshToken) {
            return res.status(401).send('refresh token not found');
        }

        const decoded = await jwtServise.verifyRefreshToken(req.cookies.refreshToken);
        if (decoded === null) {
            return res.status(404).send('not decoding token');
        }else{ 
         
        next();}
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}*/