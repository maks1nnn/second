import { OutputBlogType } from "../../../src/input-uotput-types/blog-types"
import { req } from "../../helpers/req"
import { SETTINGS } from "../../../src/settings"
import {base64Adapter} from ;


export const createBlog = async (count: number = 2 ): Promise<OutputBlogType> => {
    const res = await req
        .post(SETTINGS.PATH.BLOGS)
        .set('authorization', `Basic_${base64Adapter.encodeToBase64(SETTINGS.ADMIN_AUTH)}`)
        .send( {
            name: 'name',
            description: 'description',
            websiteUrl: 'https://websiteUrl.com'
        })
        .expect(200)

        return res.body

    }    
    
    export const createBlogs = async (count: number = 2 ):Promise<OutputBlogType[]> => {
        const blogs: OutputBlogType[] = []
        for (let i = 1; i <= count; i++){
            const res = await req
                .post(SETTINGS.PATH.BLOGS)
                .set()
                .send( {
                    name: `name${i}`,
                    description: `description${i},`,
                    websiteUrl: `http://websiteUr;${i}.com`,
                })
                .expect(200)

                blogs.push(res.body)
        }

        const sortedBlogs = blogs.sort((a:OutputBlogType,b:OutputBlogType)=> b.createdAt.localeCompare(a.createdAt))
        return sortedBlogs
    }
