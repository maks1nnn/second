import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { LoginServise } from "../servise/authLogin-servise"
import { jwtServise } from "../../domain/jwt-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"
import jwt from "jsonwebtoken";
import { injectable, inject } from 'inversify'
import { UserServise } from "../../users/service/user-servise"
import { IpControlRepository } from "../../security/repository/ipRepository"
import { SecurityService } from "../../security/servise/security-servise"

@injectable()
export class LoginControllers {
    constructor(@inject(LoginServise)protected loginServise:LoginServise,
                @inject(UserServise)protected userServise:UserServise,
                @inject(IpControlRepository)protected ipControlRepository:IpControlRepository,
                @inject(SecurityService)protected securityService:SecurityService) {

    }
    async loginController (req: Request, res: Response) {

        try {
            const title = req.headers['user-agent'] || 'Unknown Device'
            const ip = req.ip || 'djondow'

            const result = await this.loginServise.loginUser(req.body, title, ip)
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
    async authMeController (req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken;
    
            if (req.userId === null) {
                res.status(401).send('Govno')
                return
            }
            const user = await this.userServise.findByIdForMe(new ObjectId(req.userId))
            if (user) {
    
                res.status(200).send(user)
            }
        } catch (err) {
            console.error(err)
            res.status(502).send()
        }
    }
    async logoutController (req: Request, res: Response) {
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
            
                //const safeToken = await jwtRepository.findRefreshToken(payload)
                const session = await this.ipControlRepository.findSessionByIdAndDeviceId(payload)
                
                if(session  === null){
                    return res.status(401).json({message: 'token is bad'})
                    
                }
    
               if(payload.iat !== session.iat ){
                    return res.status(401).json({message: 'token is bad'})
                     
                }
                const outDevice = await this.securityService.deleteUserSession(payload)
                
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
    
            return res.status(204).send();
    
        } catch (err) {
            console.error(err)
           return res.status(502).send()
        }
    
    }
    async refreshTokenController (req: Request, res: Response) {
        try {
            const result = await this.loginServise.checkAndUpdateRefToken(req.cookies.refreshToken)
            if (result.status === ResultStatus.Unauthorized) {
                res.status(401).send(result.errorMessage)
            }
    
            if (result.status === ResultStatus.Success) {
                const { token, refreshToken } = result.data!;
    
                res
                    .cookie('refreshToken', refreshToken, {
                        httpOnly: true, // Защищает от XSS атак
                        secure: true,
                    })
                    .status(200)
                    .send({
                        accessToken: token
                    })
            }
    
    
        } catch (err) {
            console.log(err)
            res.status(502).send()
        }
    
    }
    async newPasswordController (req:Request,res:Response) {

    }
    async passwordRecoveryController (req:Request,res:Response){

    }
}