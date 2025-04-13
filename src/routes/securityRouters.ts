import { Router } from "express";
import { getDeviceController } from "../security/controllers/getDreviseController";
import { deleteAllDevicesController } from "../security/controllers/deleteDeviceController";
import { deleteUserSessionController } from "../security/controllers/deleteDeviseController";

export const securityRouter = Router()

securityRouter.get('/devices', getDeviceController)
securityRouter.delete('/devices', deleteAllDevicesController)
securityRouter.delete('/devices/:deviseId', deleteUserSessionController)