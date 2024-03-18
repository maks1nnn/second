import {Router} from 'express'
import { postControllers } from '../conttrollers/postControllaers'


export const postsRouter = Router()

postsRouter.get('/', postControllers.getAll)
postsRouter.get('/:id', postControllers.find)
postsRouter.post('/', postControllers.create)
postsRouter.put('/:id', postControllers.update)
postsRouter.delete('/:id', postControllers.delete)