import { Router } from "express";




export const securityRouter = Router()

securityRouter.get('/devices', getDeviceController)
securityRouter.delete('/devices', deleteAllDevices)
securityRouter.delete('/devices/:deviseId', deleteUserSession)