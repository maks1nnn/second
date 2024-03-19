import { Request, Response } from 'express'
import { blogRepository } from '../repositories/blogs-repositories'
import { OutputErrorsType } from '../input-uotput-types/output-errors-types'
import { OutputBlogType, InputBlogType } from '../input-uotput-types/blog-types'




export const blogControllers = {
    getAll(req: Request, res: Response<OutputBlogType[]>) {
        const blogs = blogRepository.getAllBlogs()
        if (blogs) {
            res.status(200).json(blogs)
        } else {
            res.status(404).end()
        }
    },

    find(req: Request<{id:string}>, res: Response<OutputBlogType>) {
        const blog = blogRepository.findBlogs(req.params.id)
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).end()
        }
    },

    create(req: Request<{},{}, InputBlogType>, res: Response<OutputErrorsType | OutputBlogType>) {
        /* const errors = inputValidation(req.body)
         if (errors.errorsMessages.length) {
             res
                 .status(400)
                 .json(errors)
             return
         }*/

        const newBlog = blogRepository.createBlogs(req.body)
        res.status(201).json(newBlog)


    },

    update (req:Request<{id:string}, {}, InputBlogType>,res:Response<OutputErrorsType|OutputBlogType>) {
        const updateBlog = blogRepository.updateBlogs(req.params.id, req.body)
        if(updateBlog){
        res.status(204).end()}else{
            res.status(404).end()
        }
    },

    delete(req: Request<{id:string}>, res: Response<OutputBlogType[]>) {
        const isDelete = blogRepository.deleteBlogs(req.params.id)
        if (isDelete) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }



}