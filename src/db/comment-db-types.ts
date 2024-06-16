

export type CommentDBType = {
    postId:string
    _id: string,
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string,
    },
    createAt: string

}