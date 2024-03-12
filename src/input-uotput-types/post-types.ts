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