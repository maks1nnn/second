import { Router } from "express";
import { authControllers } from "../conttrollers/autControllers";

export const authRouter = Router()

authRouter.post('/login', authControllers.checkUser)
authRouter.get('/me', authControllers.getMyData)