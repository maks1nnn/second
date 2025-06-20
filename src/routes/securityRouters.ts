import { Router } from "express";
import { getDeviceController } from "../security/controllers/getDeviseController";
import { deleteAllDevicesController } from "../security/controllers/deleteAllDeviceController";
import { deleteUserSessionController } from "../security/controllers/deleteDeviceController";
import { authJWTMiddleware } from "../auth/middlewares/authJWTMiddleware";

export const securityRouter = Router()

securityRouter.get('/devices',   getDeviceController)
securityRouter.delete('/devices',  deleteAllDevicesController)
securityRouter.delete('/devices/:deviceId',  deleteUserSessionController)