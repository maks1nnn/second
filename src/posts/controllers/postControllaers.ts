import { Request, Response } from 'express'
import { PostServise } from '../service/post-servise'
import { OutputErrorsType } from '../../input-uotput-types/output-errors-types'
import { OutputPostDBType, InputPostType } from '../types/post-types'
import { ObjectId } from 'mongodb'
import { InputCommentType, OutputCommentType } from '../../comments/types/comment-types'
import { CommentService } from '../../comments/servise/comment-servise'
import { queryCommentRepository } from '../../comments/repository/commentMongoQueryRepositories'
import { ResultStatus } from '../../input-uotput-types/resultCode'
import { injectable, inject } from 'inversify'

@injectable()
export class PostControllers  {
    constructor(@inject(PostServise)protected postServise: PostServise,
                @inject(CommentService)protected commentService:CommentService){

    }

    async getAllBySort(req: Request, res: Response) {
        //const sanitizedQuery =  queryBlogRepository.helper(req.query)
        const posts = await this.postServise.getAllPostsBySort(req.query,/*req.params.blogId*/)
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).end()
        }
    }
    async getAll(req: Request, res: Response<OutputPostDBType[]> | any) {
        const posts = await this.postServise.getAllPosts()
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).end()
        }
    }

    async find(req: Request<{ id: string }>, res: Response<OutputPostDBType>) {
        const post = await this.postServise.findPosts(new ObjectId(req.params.id))
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).end()
        }
    }

    async create(req: Request<{}, {}, InputPostType>, res: Response<OutputErrorsType | OutputPostDBType>) {

        const insertInfo = await this.postServise.createPosts(req.body)
        if (insertInfo) {
            const newBlog = await this.postServise.findPosts(insertInfo)
            if (newBlog) {
                res.status(201).json(newBlog)
            }
        } else { res.status(400).end() }

    }

    async update(req: Request<{ id: string }, {}, InputPostType>, res: Response<OutputErrorsType | OutputPostDBType>) {
        const updatePost = await this.postServise.updatePosts(new ObjectId(req.params.id), req.body)
        if (updatePost) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }

    async delete(req: Request<{ id: string }>, res: Response<OutputPostDBType[]>) {
        const isDelete = await this.postServise.deletePosts(new ObjectId(req.params.id))
        if (isDelete) {
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    }

    async createPostComment(req: Request<{ postId: string }, {}, InputCommentType>, res: Response<OutputCommentType | OutputErrorsType>) {
        try {
            const isPost = await this.postServise.findPosts(new ObjectId(req.params.postId))
            if (isPost === null) {
                return res.status(404).end()  
            }
            const createComment = await this.commentService.createComment(req.params.postId, req.body.content, req.userId)
            if (req.userId === null ) {
              return  res.status(401).end()
            }
            if (createComment) {
                const newComment = await this.commentService.getCommentById(createComment)
                if (newComment) {
                 return   res.status(201).json(newComment)
                } else {
                  return  res.status(404).end()
                }
            }else {
                return  res.status(404).end()
              }
        } catch (err) {
            console.log(err)
            return res.status(500).end()
        }
    }

    async getAllPostComments(req: Request, res: Response) {
        const isPost = await this.postServise.findPosts(new ObjectId(req.params.postId))
        if (isPost === null) {
            return res.status(404).end() 
        }

        const getAll = await queryCommentRepository.getAllUsers(new ObjectId(req.params.postId), req.query)
        if (getAll) {
           return res.status(200).json(getAll)
        } else {
           return res.status(404).end()
        }
    }


}