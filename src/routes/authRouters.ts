import { Router } from "express";
import { authJWTMiddleware } from "../auth/middlewares/authJWTMiddleware";
import { userValidationMiddlevare } from '../users/middlewars/usersMiddleware'
import { inputCheckErrorsMiddleware } from '../middlewares/inputValidationResultMiddlewares'
import { checkRateLimit } from "../middlewares/checkRateLimit";
import { container } from "../composition-root";
import { LoginControllers } from "../auth/controllers/loginControllers";
import { RegisterControllers } from "../auth/controllers/registerControllers";
import { userPasswordAndEmailValidationMiddlevare } from "../auth/middlewares/validationForEmailAndPassord";

const loginControllers = container.get(LoginControllers)
const registrControllers = container.get(RegisterControllers)
export const authRouter = Router()

authRouter.post('/login', checkRateLimit , loginControllers.loginController.bind(loginControllers))
authRouter.get('/me',  authJWTMiddleware, loginControllers.authMeController.bind(loginControllers))
authRouter.post('/registration-confirmation', checkRateLimit, registrControllers.registrationConfirmationController.bind(registrControllers) )
authRouter.post('/registration', ...userValidationMiddlevare, checkRateLimit, inputCheckErrorsMiddleware, registrControllers.registrationController.bind(registrControllers))
authRouter.post('/registration-email-resending',checkRateLimit, registrControllers.registrationEmailResendingController.bind(registrControllers))
authRouter.post('/refresh-token',  loginControllers.refreshTokenController.bind(loginControllers))
authRouter.post('/logout',  loginControllers.logoutController.bind(loginControllers))
authRouter.post('/password-recovery', userPasswordAndEmailValidationMiddlevare[1] ,checkRateLimit, inputCheckErrorsMiddleware, loginControllers.passwordRecoveryController.bind(loginControllers) )
authRouter.post('/new-password', userPasswordAndEmailValidationMiddlevare[0] ,checkRateLimit, inputCheckErrorsMiddleware, loginControllers.newPasswordController.bind(loginControllers) )
 