import {req} from '../helpers/req'
import { SETTINGS } from '../../src/settings'
import {createBlogs} from './helpers/blog-helpers'
import {createPosts} from './helpers/post-helpers'
import {ObjectId} from 'mongodb'
//import {OutputBlogType} from '../../src/input-uotput-types/blog-types'
//import {OutputPostDBType} from '../../src/input-uotput-types/post-types'  
import {MongoMemoryServer} from 'mongodb-memory-server-core'
import { Db , MongoClient} from 'mongodb'

describe('GET /blogs', () =>{
    let mongoServer: MongoMemoryServer;
    let connection: MongoClient;
    let db: Db;
    beforeAll(async () => {
        const mongoServer: MongoMemoryServer = await MongoMemoryServer.create()
        const uri = mongoServer.getUri();
          connection = await MongoClient.connect(uri);
          db  = connection.db();
    })
    afterAll(async() => {
        await connection.close();
        await mongoServer.stop();
    })
    beforeEach(async () => {
        await db.dropDatabase();
    })

    it(' GET blogs empty array: status: 200', async () => {
        const res = await (req.get(SETTINGS.PATH.BLOGS).expect(404))

        expect(res.body.items.length).toBe(0)
    })
})