import { req } from '../helpers/req'
import { SETTINGS } from '../../src/settings'
import { createBlogs } from './helpers/blog-helpers'
import { createPosts } from './helpers/post-helpers'
import { ObjectId } from 'mongodb'
//import {OutputBlogType} from '../../src/input-uotput-types/blog-types'
//import {OutputPostDBType} from '../../src/input-uotput-types/post-types'  
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import { Db, MongoClient } from 'mongodb'
import { db } from './../e2e/helpers/db'
import { testSeeder } from './../e2e/utils/test.seederForBlogs'

describe('BLOGS_TEST', () => {
    let mongoServer: MongoMemoryServer;
    let connection: MongoClient;
    beforeAll(async () => {
        const mongoServer: MongoMemoryServer = await MongoMemoryServer.create()
        SETTINGS.MONGO_URL = mongoServer.getUri();
        await db.run()
    })
    afterAll(async () => {
        await db.stop();
    })
    beforeEach(async () => {
        await db.drop();
    })

    it(' GET blogs empty array: status: 200', async () => {
        const res = await req.get(SETTINGS.PATH.BLOGS).expect(404)

        expect(res.status).toBe(404)
        //expect(res.body).toEqual([])
    })
    it.skip('Post blogs create new blog, async', async () => {
        const data = testSeeder.createBlogDto()
        const ADMIN_AUTH = 'admin:qwerty'; // Пример, должен быть такой же, как в middleware
        const CORRECT_BASIC_AUTH = `Basic YWRtaW46cXdlcnR5`;
        const result = await req.post(SETTINGS.PATH.BLOGS)
            .set('Authorization', CORRECT_BASIC_AUTH)
            .send(data)
            .expect(200)

        expect(result.status).toBe(200)
  

    })

    it ('get some blogs', async () => {
        const result = await req.get(SETTINGS.PATH.BLOGS)
                                 
        expect(result.status).toBe(200)
         
    })

})