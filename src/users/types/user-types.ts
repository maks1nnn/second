import { ObjectId } from "mongodb"


export const UserValidationRules = {
    loginMaxLength : 10,
    loginMinLength: 3,
    loginPattern: /^[a-zA-Z0-9_-]*$/,
    passwordMaxLength: 20,
    passwordMinLength: 6,
    emailPattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
}

export type InputUserType = {
    login: string,
    password: string,
    email: string,
}

export type IdType = {
    id: string
}

export class UserDbType {
    constructor(public _id: ObjectId,
                public login: string,
                public enmail: string,
                public passwordHash: string,
                public createAt: string,
                public emailConfirmation: {
                    confirmationCode: string,
                    expirationDate: Date,
                    isConfirmed: boolean,
                }
                 ){

                }
}