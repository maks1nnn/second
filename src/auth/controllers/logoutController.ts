import { Request, Response } from "express"
import { jwtServise } from "../../domain/jwt-servise"
import jwt from "jsonwebtoken";
import { jwtRepository } from "../../repositories/jwt-repositories";
import { ResultStatus } from "../../input-uotput-types/resultCode";

export const logoutController = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;


        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token is missing" });
        }

        try{
            const payload = await jwtServise.verifyRefreshToken(refreshToken)
            if(payload === null){
                return res.status(401).json({message:'1token was expired'})
            }

        }catch (err){
            if(err instanceof jwt.TokenExpiredError){
                return res.status(401).json({message:'token was expired'})
            }
            if(err instanceof jwt.JsonWebTokenError){
                return res.status(401).json({message: 'token is bad'})
            }


            throw err
        }

        const payload = await jwtServise.verifyRefreshToken(refreshToken)      
        
            const safeToken = await jwtRepository.findRefreshToken(payload)
            
            if(safeToken  === null){
                return res.status(401).json({message: 'token is bad'})
                
            }

           if(refreshToken !== safeToken ){
                return res.status(401).json({message: 'token is bad'})
                 
            }
        
            const delToken = await jwtRepository.logoutAllDevices(payload)
            
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(204).send();

    } catch (err) {
        console.error(err)
        res.status(502).send()
    }

}