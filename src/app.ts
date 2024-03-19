import express from "express"
import {SETTINGS} from './settings'
import { postsRouter } from "./routes/postRouters"
import { blogsRouter } from "./routes/blogRouters"
import { testRouter } from "./routes/testRouter"

export const app = express()

app.use(express.json())


app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.TEST, testRouter)