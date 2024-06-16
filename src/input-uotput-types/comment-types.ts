

  export type OutputCommentType = {
    id: string,
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string,
    },
    createAt: string
  }

  export type InputCommentType = {
   content: string
  }

  export type UpdateCommentType = {
    content: string
  }

  export const CommentyValidatorRules = {
    maxLength: 300,
    minLength: 20,
  }