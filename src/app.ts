import express from "express"
import {SETTINGS} from './settings'
import { postsRouter } from "./posts"
import { blogsRouter } from "./blogs"
import { testRouter } from "./test"

export const app = express()



app.use(express.json())


app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, blogsRouter)
app.use(SETTINGS.PATH.TEST, testRouter)