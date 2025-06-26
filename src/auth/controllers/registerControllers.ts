import { Request, Response } from "express"
import { AuthServise } from "../servise/authRegister-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"
import { injectable, inject} from 'inversify'

@injectable()
export class RegisterControllers {
    constructor(@inject(AuthServise)protected authServise:AuthServise){

    }
    async registrationConfirmationController   (req:Request,res:Response)   {
        try{
            const result = await this.authServise.confirmRegistration(req.body.code)
            if (result.status === ResultStatus.BadRequest){
                res.status(400).send({errorsMessages: result.extensions})
                return
            }
            res.status(204).send()
        }catch (err) {
            console.error(err)
            res.status(502).send()
        }
    }
    async registrationController (req:Request,res:Response) {
        try{
            const result = await this.authServise.registrationUser(req.body)
            if (result.status === ResultStatus.BadRequest){
                res.status(400).send({errorsMessages:result.extensions})
                 
            }
            if(result.status === ResultStatus.Success){res.status(204).send()}
        }catch (err) {
            console.error(err)
            res.status(502).send()
        }
    }
    async registrationEmailResendingController (req:Request,res:Response) {
  
        const result = await this.authServise.registrationEmailResending(req.body.email)
        if (result.status === ResultStatus.BadRequest){
            res.status(400).send({errorsMessages: result.extensions})
            return
        }
         
        res.status(204).send()
     
}
}
