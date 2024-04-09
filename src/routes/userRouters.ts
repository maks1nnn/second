import {Router} from 'express'
import { usersControllers } from '../conttrollers/usersControllers'



export const usersRouter = Router()


usersRouter.get('/', usersControllers.getAllUsers)
usersRouter.post('/', usersControllers.createUser)
usersRouter.delete('/:id', usersControllers.deleteUser)