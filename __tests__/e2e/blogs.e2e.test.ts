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
import { app } from '../../src/app'
import { addRoutes } from './../../src/routes/routes'
import { connectionToDB } from '../../src/db/mongo-db'
import request from 'supertest'

const getRequest = () => {
    return request(app)
}
addRoutes(app)

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
        //  await db.drop();
    })

    it(' GET blogs empty array: status: 200', async () => {
        const res = await getRequest().get(`${SETTINGS.PATH.BLOGS}/`).expect(200)

        expect(res.status).toBe(200)
        //expect(res.body).toEqual([])
    })
    it('Post blogs create new blog, async', async () => {
        const data = testSeeder.createBlogDto()
        const ADMIN_AUTH = 'admin:qwerty';  
        //const CORRECT_BASIC_AUTH = `Basic YWRtaW46cXdlcnR5`;
        const base64Credentials = Buffer.from(ADMIN_AUTH).toString('base64');
        const CORRECT_BASIC_AUTH = `Basic ${base64Credentials}`;

        const result = await getRequest().post(`${SETTINGS.PATH.BLOGS}/`)
            .set('Authorization', CORRECT_BASIC_AUTH)
            .send(testSeeder.createBlogDto())
            .expect(201)

        expect(result.status).toBe(201)


    })

    it('get some blogs', async () => {
        const result = await getRequest().get(`${SETTINGS.PATH.BLOGS}/`)

        expect(result.status).toBe(200)

    })

})