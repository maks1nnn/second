import {body, param} from "express-validator"
import { ObjectId } from "mongodb"
import {PostValidatorRules} from '../../posts/types/post-types'
import {blogRepository} from '../repository/blogMongo-repositories'


export const paramsBlogValidate = [
param('blogId')
        .isString()
        .withMessage('Blog should be string')
        .trim()
        .isLength({ min: 12, max: 24 })
        .withMessage('Blog Id is required')
        .custom(async (blogId) => {
            const blog = await blogRepository.findBlogs(new ObjectId(blogId));
            if (!blog) {
                return Promise.reject('There is no blog with such id');
            }
            return true;
        })
        .withMessage("There is no blog with such id")
        .matches(/^[0-9a-fA-F]+$/, 'i')
        .withMessage('invalidId'),
    ]