import { Request, Response } from 'express'
import { blogServise } from '../domain/blog-servise'
import { OutputErrorsType } from '../input-uotput-types/output-errors-types'
import { OutputBlogType, InputBlogType } from '../input-uotput-types/blog-types'
import { ObjectId } from 'mongodb'




export const blogControllers = {
    async getAll(req: Request, res: Response<OutputBlogType[]|any>) {
        const blogs = await blogServise.getAllBlogs()
        if (blogs) {
            res.status(200).json(blogs)
        } else {
            res.status(404).end()
        }
    },

    async find(req: Request<{ id: string }>, res: Response<OutputBlogType>) {
        const blog = await blogServise.findBlogById(new ObjectId(req.params.id))
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).end()
        }
    },

    async create(req: Request<{}, {}, InputBlogType>, res: Response<OutputErrorsType | OutputBlogType>) {


        const insertInfo = await blogServise.createBlogs(req.body)
        if(insertInfo){
        const newBlog = await blogServise.findBlogById(insertInfo)
        if(newBlog){
        res.status(201).json(newBlog)}}else {res.status(400).end()}


    },

    async update(req: Request<{ id: string }, {}, InputBlogType>, res: Response<OutputErrorsType | OutputBlogType>) {
        const updateBlog = await blogServise.updateBlogs(new ObjectId(req.params.id), req.body)
        if (updateBlog) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    },

    async delete(req: Request<{ id: string }>, res: Response<OutputBlogType[]>) {
        const isDelete = await blogServise.deleteBlogs(new ObjectId(req.params.id))
        if (isDelete) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }



}