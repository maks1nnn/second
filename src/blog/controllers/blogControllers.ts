import { query, Request, Response } from 'express'
import { BlogServise } from '../service/blog-servise'
import { OutputErrorsType } from '../../input-uotput-types/output-errors-types'
import { OutputBlogType, InputBlogType } from '../types/blog-types'
import { ObjectId } from 'mongodb'
import { queryBlogRepository } from '../repository/blogMongoQueryRepository'
import { InputPostInBlogType, OutputPostDBType, OutputPostPaginType } from '../../posts/types/post-types'
import { PostServise } from '../../posts/service/post-servise'
import {injectable, inject} from 'inversify'

@injectable()
export class BlogControllers   {
    constructor(@inject(BlogServise)protected blogServise: BlogServise,
                @inject(PostServise) protected postServise: PostServise){

                }
    async getAllBySort(req:Request,res:Response){
        //const sanitizedQuery =  queryBlogRepository.helper(req.query)
        const blogs = await this.blogServise.getAllBlogsBySort(req.query ,/*req.params.blogId*/)
        if (blogs) {
            res.status(200).json(blogs)
        } else {
            res.status(404).end()
        }
    }
    async getAll(req: Request, res: Response<OutputBlogType[]|any>) {
        const blogs = await this.blogServise.getAllBlogs()
        if (blogs) {
            res.status(200).json(blogs)
        } else {
            res.status(404).end()
        }
    }

    async find(req: Request<{ id: string }>, res: Response<OutputBlogType|OutputErrorsType>) {
        const blog = await this.blogServise.findBlogById(new ObjectId(req.params.id))
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).end()
        }
    }

    async findPostsByBlogId(req:Request, res:Response) {
        const posts = await this.blogServise.findPostsByBlogId(req.query, req.params.blogId)
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).end()
        }
    }

    async create(req: Request<{}, {}, InputBlogType>, res: Response<OutputErrorsType | OutputBlogType>) {


        const insertInfo = await this.blogServise.createBlogs(req.body)
        if(insertInfo){
        const newBlog = await this.blogServise.findBlogById(insertInfo)
        if(newBlog){
        res.status(201).json(newBlog)}}else {res.status(404).end()}


     }

    async createPostInBlog(req: Request<{blogId:string},{},InputPostInBlogType> , res: Response<OutputErrorsType | OutputPostDBType>) {
        const insertInfo = await this.postServise.createPostInBlog(req.body,req.params.blogId)
        if(insertInfo){
        const newPost = await this.postServise.findPosts(insertInfo)
        if(newPost){
        res.status(201).json(newPost)}}else {res.status(404).end()}


    }



    async update(req: Request<{ id: string }, {}, InputBlogType>, res: Response<OutputErrorsType | OutputBlogType>) {
        const updateBlog = await this.blogServise.updateBlogs(new ObjectId(req.params.id), req.body)
        if (updateBlog) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }

    async delete(req: Request<{ id: string }>, res: Response<OutputBlogType[]>) {
        const isDelete = await this.blogServise.deleteBlogs(new ObjectId(req.params.id))
        if (isDelete) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }



}