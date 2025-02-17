import {Router} from 'express'
import { testControllers } from '../tests/controllers/testControllers'


export const testRouter = Router()


testRouter.delete('/all-data', testControllers.deleteAll)