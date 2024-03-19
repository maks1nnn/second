import {Router} from 'express'
import { testControllers } from '../conttrollers/testControllers'


export const testRouter = Router()


testRouter.delete('/all-data', testControllers.deleteAll)