import {req} from '../helpers/req'
import { SETTINGS } from '../../src/settings'
import {createBlogs} from './helpers/blog-helpers'
import {createPosts} from './helpers/post-helpers'
import {ObjectId} from 'mongodb'
import {OutputBlogType} from '../../src/input-uotput-types/blog-types'
import {OutputPostDBType} from '../../src/input-uotput-types/post-types'  
import {MongoMemoryServer} from 'mongodb-memory-server-core'
import { db } from '../../src/db/mongo-db'

describe('GET /blogs', () =>{
    beforeAll(async () => {
        const mongoServer: MongoMemoryServer = await MongoMemoryServer.create()
        await db.run(mongoServer.getUri())
    })
    afterAll(async() => {
        await db.stop()
    })
    beforeEach(async () => {
        await db.drop()
    })

    it(' GET blogs empty array: status: 200', async () => {
        const res = await (req.get(SETTINGS.PATH.BLOGS).expect(200))

        expect(res.body.items.length).toBe(0)
    })
})