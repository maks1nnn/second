import { Router } from "express";
import { authControllers } from "../conttrollers/autControllers";

export const authRouter = Router()

authRouter.post('/', authControllers.checkUser)