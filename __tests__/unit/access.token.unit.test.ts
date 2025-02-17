import { db } from  '../../src/db/mongo-db'
import MongoMemoryServer from "mongodb-memory-server-core"
import { SETTINGS } from "../../src/settings"
import {authServise} from '../../src/auth/servise/auth-servise'
import { ResultStatus } from '../../src/input-uotput-types/resultCode'


describe('UNIT', ()=>{

    beforeAll( async () => {
        const mongoServer = await MongoMemoryServer.create()
        const url = mongoServer.getUri()
        SETTINGS.MONGO_URL = url
    })

    beforeEach(async ()=> {
        await db.drop()
    })

    afterAll( async () => {
        await db.drop()
        await db.stop()
    })

    afterAll( (done)=> done())

    const checkAccessTokenUseCase = authServise.checkAccessToken;

    it( 'should not verify noBearer auth', async () => {
        const result = await checkAccessTokenUseCase("Basic sefdofgf")

        expect (result.status).toBe(ResultStatus.Unauthorized)
    })
})