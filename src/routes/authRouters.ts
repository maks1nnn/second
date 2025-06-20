import { Router } from "express";
//import { authControllers } from "../auth/controllers/autControllers";
import { loginController } from "../auth/controllers/authLoginController";
import { authMeController } from "../auth/controllers/authMeController";
import { registrationConfirmationController } from "../auth/controllers/registrationConfirmationController";
import { registrationController } from "../auth/controllers/registrationController";
import { registrationEmailResendingController } from "../auth/controllers/registrationEmailResending";
import { authJWTMiddleware } from "../auth/middlewares/authJWTMiddleware";
import { userValidationMiddlevare } from '../users/middlewars/usersMiddleware'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { logoutController } from "../auth/controllers/logoutController";
import { refreshTokenController } from "../auth/controllers/refreshTokenController";
import { checkRateLimit } from "../middlewares/checkRateLimit";
import { newPasswordController } from "../auth/controllers/newPassswordController";
import { passwordRecoveryController } from "../auth/controllers/passwordRecoveryController";

export const authRouter = Router()

authRouter.post('/login', checkRateLimit , loginController)
authRouter.get('/me',  authJWTMiddleware, authMeController)
authRouter.post('/registration-confirmation',checkRateLimit, registrationConfirmationController )
authRouter.post('/registration',...userValidationMiddlevare,checkRateLimit, inputCheckErrorsMiddleware, registrationController)
authRouter.post('/registration-email-resending',checkRateLimit, registrationEmailResendingController)
authRouter.post('/refresh-token',  refreshTokenController)
authRouter.post('/logout',  logoutController)
authRouter.post('/pasword-recovery', passwordRecoveryController )
authRouter.post('/new-password', newPasswordController )
 