import { Router } from "express";
//import { authControllers } from "../auth/controllers/autControllers";
import { loginController } from "../auth/controllers/authLoginController";
import { authMeController } from "../auth/controllers/authMeController";
import { registrationConfirmationController } from "../auth/controllers/registrationConfirmationController";
import { registrationController } from "../auth/controllers/registrationController";
import { registrationEmailResendingController } from "../auth/controllers/registrationEmailResending";
import { authJWTMiddleware } from "../middlewares/authJWTMiddleware";
import { userValidationMiddlevare } from '../middlewares/usersMiddleware'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'

export const authRouter = Router()

authRouter.post('/login', loginController)
authRouter.get('/me',  authJWTMiddleware, authMeController)
authRouter.post('/registration-confirmation', registrationConfirmationController )
authRouter.post('/registration',...userValidationMiddlevare, inputCheckErrorsMiddleware, registrationController)
authRouter.post('/registration-email-resending', registrationEmailResendingController)
                