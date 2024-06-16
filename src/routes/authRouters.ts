import { Router } from "express";
import { authControllers } from "../conttrollers/autControllers";
import { authJWTMiddleware } from "../middlewares/authJWTMiddleware";

export const authRouter = Router()

authRouter.post('/login', authControllers.getUserByToken)
authRouter.get('/me',authJWTMiddleware, authControllers.getMyData)