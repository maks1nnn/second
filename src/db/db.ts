import { PostDBType } from "./post-db-type";
import { BlogDBType } from "./blog-db-type";


export type DBType = {
    blogs: BlogDBType[],
    posts : PostDBType[],
}

export const db: DBType = {
    blogs: [],
    posts: []
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.posts = []
        db.blogs = []
        return
    }
}