export type OutputPostDBType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
   // blogName: string
}

export type InputPostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
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