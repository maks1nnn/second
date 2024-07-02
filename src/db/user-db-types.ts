
export type UserDBType = {

    login: string,
    email: string,
    passwordHash: string,
    createdAt: string,
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: Date,
        isConfirmed: boolean,
    },
}



export type UserInputType = {
    login: string,
    password: string,
    email: string,

}

export type UserOutputType = {

    id: string,
    login: string,
    email: string,
    createdAt: string,
}