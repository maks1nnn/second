import {config} from 'dotenv'

config()

export const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'


export const SETTINGS ={
    PORT: process.env.PORT || 3003,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TEST: '/testing',
        USERS: '/users',
        AUTH: '/auth',
        COMMENT: '/comments',
        SECURITY: '/security'
    },
    ADMIN_AUTH: {
        admin:'qwerty'
    },
    MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
    DB_NAME: process.env.DB_NAME || "",
    BLOG_COLLECTION_NAME :process.env.BLOG_COLLECTION_NAME || "",
    POST_COLLECTION_NAME :process.env.POST_COLLECTION_NAME|| "",
    USER_COLLECTION_NAME :process.env.USER_COLLECTION_NAME || "",
    AUTH_COLLECTION_NAME :process.env.AUTH_COLLECTION_NAME || "",
    COMMENT_COLLECTION_NAME : process.env.COMMENT_COLLECTION_NAME || "",
    JWT_COLLECTION_NAME : process.env.JWT_COLLECTION_NAME || "" ,
    AC_SECRET :  "123",
    AC_TIME:  "10s" ,
    REF_SECRET :  "456",
    REF_TIME:  "20s" ,
    EMAIL: 'petrovskijmaksim345@gmail.com',
    EMAIL_PASS: "pavvumxpuqcdgsqg" ,
}