import { Router } from "express";
import { authControllers } from "../auth/controllers/autControllers";
import { authJWTMiddleware } from "../middlewares/authJWTMiddleware";

export const authRouter = Router()

authRouter.post('/login', authControllers.getUserByToken)
authRouter.get('/me',authJWTMiddleware, authControllers.getMyData)
authRouter.post('/registration-confirmation', authControllers.registrationConfirmation )
authRouter.post('/registration', authControllers.registration)
authRouter.post('/registration-email-resenging', authControllers.registrationEmailResending)