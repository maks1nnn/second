import { Router } from "express";
import { getDeviceController } from "../security/controllers/getDeviseController";
import { deleteAllDevicesController } from "../security/controllers/deleteAllDeviceController";
import { deleteUserSessionController } from "../security/controllers/deleteDeviceController";
import { authJWTMiddleware } from "../auth/middlewares/authJWTMiddleware";

export const securityRouter = Router()

securityRouter.get('/devices', authJWTMiddleware, getDeviceController)
securityRouter.delete('/devices',authJWTMiddleware, deleteAllDevicesController)
securityRouter.delete('/devices/:deviseId',authJWTMiddleware, deleteUserSessionController)