import { SETTINGS } from '../settings'
import { postsRouter } from "./postRouters"
import { blogsRouter } from "./blogRouters"
import { testRouter } from "./testRouter"
import { authRouter } from './authRouters'
import { usersRouter } from './userRouters'
import { commentRouter } from './commentRouters'
import { Express } from 'express-serve-static-core'

export const addRoutes = (app:Express) => {
    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)
    app.use(SETTINGS.PATH.TEST, testRouter)
    app.use(SETTINGS.PATH.USERS, usersRouter)
    app.use(SETTINGS.PATH.AUTH, authRouter)
    app.use(SETTINGS.PATH.COMMENT, commentRouter)
}