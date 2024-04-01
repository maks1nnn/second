import { ObjectId } from "mongodb"

export type OutputPostDBType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
}

export type OutputPostPaginType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: {
        id: string;
        title: string;
        shortDescription: string;
        content: string;
        blogName: string;
        createdAt: string;
        blogId: string;
    }
}

export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type InputPostInBlogType = {
    title: string,
    shortDescription: string,
    content: string,
    
}

export type UpdatePostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export const PostValidatorRules = {
    titleMaxLength:  30,
    shortDescriptionMaxLength: 100,
    contentMaxLength: 1000,
}