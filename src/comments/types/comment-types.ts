
  import { ResultStatus } from "../../input-uotput-types/resultCode"


  export type OutputCommentType = {
    id: string,
    content: string,
    commentatorInfo: {
        userId: string,
        userLogin: string,
    },
    createdAt: string
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

  export type Result<T = null> = {
    status: ResultStatus;
    errorMessage?: string;
    extensions?: [{field: string, message: string}],
    data: any
  }