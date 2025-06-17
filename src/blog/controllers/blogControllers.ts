import { query, Request, Response } from 'express'
import { blogServise } from '../service/blog-servise'
import { OutputErrorsType } from '../../input-uotput-types/output-errors-types'
import { OutputBlogType, InputBlogType } from '../types/blog-types'
import { ObjectId } from 'mongodb'
import { queryBlogRepository } from '../repository/blogMongoQueryRepository'
import { InputPostInBlogType, OutputPostDBType, OutputPostPaginType } from '../../posts/types/post-types'
import { postServise } from '../../posts/service/post-servise'



export const blogControllers = {
    async getAllBySort(req:Request,res:Response){
        //const sanitizedQuery =  queryBlogRepository.helper(req.query)
        const blogs = await blogServise.getAllBlogsBySort(req.query ,/*req.params.blogId*/)
        if (blogs) {
            res.status(200).json(blogs)
        } else {
            res.status(404).end()
        }
    },
    async getAll(req: Request, res: Response<OutputBlogType[]|any>) {
        const blogs = await blogServise.getAllBlogs()
        if (blogs) {
            res.status(200).json(blogs)
        } else {
            res.status(404).end()
        }
    },

    async find(req: Request<{ id: string }>, res: Response<OutputBlogType|OutputErrorsType>) {
        const blog = await blogServise.findBlogById(new ObjectId(req.params.id))
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).end()
        }
    },

    async findPostsByBlogId(req:Request, res:Response) {
        const posts = await blogServise.findPostsByBlogId(req.query, req.params.blogId)
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).end()
        }
    },

    async create(req: Request<{}, {}, InputBlogType>, res: Response<OutputErrorsType | OutputBlogType>) {


        const insertInfo = await blogServise.createBlogs(req.body)
        if(insertInfo){
        const newBlog = await blogServise.findBlogById(insertInfo)
        if(newBlog){
        res.status(201).json(newBlog)}}else {res.status(404).end()}


     },

    async createPostInBlog(req: Request<{blogId:string},{},InputPostInBlogType> , res: Response<OutputErrorsType | OutputPostDBType>) {
        const insertInfo = await postServise.createPostInBlog(req.body,req.params.blogId)
        if(insertInfo){
        const newPost = await postServise.findPosts(insertInfo)
        if(newPost){
        res.status(201).json(newPost)}}else {res.status(404).end()}


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