import { Request, Response } from 'express'
import { postServise } from '../domain/post-servise' 
import { OutputErrorsType } from '../input-uotput-types/output-errors-types'
import { OutputPostDBType, InputPostType } from '../input-uotput-types/post-types'
import { ObjectId } from 'mongodb'
import { InputCommentType, OutputCommentType } from '../input-uotput-types/comment-types'
import { commentService } from '../domain/comment-servise'
import { queryCommentRepository } from '../repositories/commentMongoQueryRepositories'



export const postControllers = {
    async getAllBySort(req:Request,res:Response){
        //const sanitizedQuery =  queryBlogRepository.helper(req.query)
        const posts = await postServise.getAllPostsBySort(req.query ,/*req.params.blogId*/)
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).end()
        }
    },
    async getAll(req: Request, res: Response<OutputPostDBType[]>|any) {
        const posts = await postServise.getAllPosts()
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).end()
        }
    },

    async find(req: Request<{ id: string }>, res: Response<OutputPostDBType>) {
        const post = await postServise.findPosts(new ObjectId(req.params.id))
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).end()
        }
    },

     async create(req: Request<{}, {}, InputPostType>, res: Response<OutputErrorsType | OutputPostDBType>) {

        const insertInfo = await postServise.createPosts(req.body)
        if(insertInfo){
        const newBlog = await postServise.findPosts(insertInfo)
        if(newBlog){
        res.status(201).json(newBlog)}}else {res.status(400).end()}

    },

   async update(req: Request<{ id: string }, {}, InputPostType>, res: Response<OutputErrorsType | OutputPostDBType>) {
        const updatePost = await postServise.updatePosts(new ObjectId(req.params.id), req.body)
        if (updatePost) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    },

    async delete(req: Request<{ id: string }>, res: Response<OutputPostDBType[]>) {
        const isDelete =await  postServise.deletePosts(new ObjectId(req.params.id))
        if (isDelete) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    },

    async createPostComment(req:Request<{id:string}, {}, InputCommentType>, res: Response<OutputCommentType| OutputErrorsType>){
        const createComment = await commentService.createComment(req.params.id , req.body.content, req.userId)
        if(createComment){
            const newComment = await commentService.getCommentById(createComment) 
            if (newComment){
            res.status(200).json(newComment)
        }else{
            res.status(404).end()}}
       
    },

    async getAllPostComments(req: Request,res: Response) {
        const getAll = await queryCommentRepository.getAllUsers(req.params)
        if(getAll){
            res.status(200).json(getAll)
        }else{
            res.status(404).end()
        }
    }



}