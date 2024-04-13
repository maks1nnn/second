
export type UserDBType = {

id: string,
login: string,
email: string,
createdAt: string,
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