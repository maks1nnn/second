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
        AUTH: '/auth'
    },
    ADMIN_AUTH: {
        admin:'qwerty'
    },
    MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
    DB_NAME: process.env.DB_NAME || "",
    BLOG_COLLECTION_NAME :process.env.BLOG_COLLECTION_NAME || "",
    POST_COLLECTION_NAME :process.env.POST_COLLECTION_NAME|| "",
    USER_COLLECTION_NAME :process.env.USER_COLLECTION_NAME || "",
}