import { SETTINGS } from '../settings'
import { postsRouter } from "./postRouters"
import { blogsRouter } from "./blogRouters"
import { testRouter } from "./testRouter"
import { Express } from 'express-serve-static-core'

export const addRoutes = (app:Express) => {
    app.use(SETTINGS.PATH.BLOGS, blogsRouter)
    app.use(SETTINGS.PATH.POSTS, postsRouter)
    app.use(SETTINGS.PATH.TEST, testRouter)
}