import { Router } from "express";
import { container } from "../composition-root";
import { SecurityControllers } from "../security/controllers/securityControllers";

const securityControllers= container.get(SecurityControllers)
export const securityRouter = Router()

securityRouter.get('/devices',   securityControllers.getDeviceController.bind(securityControllers) )
securityRouter.delete('/devices',  securityControllers.deleteAllDevicesController.bind(securityControllers))
securityRouter.delete('/devices/:deviceId',  securityControllers.deleteUserSessionController.bind(securityControllers))